/* Built in modules */
const crypto = require("crypto");
const { promisify } = require("util");

/* Node modules */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* 3rd party modules */
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

/* Function for signing JSON Web Token */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/* Creating and sending token */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  /* Sending JWT as cookie to client */
  res.cookie("jwt", token, cookieOptions);

  /* Remove the password from output */
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    passwordChangedAt: req.body.passwordChangedAt,
  });
  console.log(newUser);

  createSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  console.log(req);
  const { email: reqEmail, password: reqPassword } = req.body;

  /* 1) Checking whether email or password exist */
  if (!reqEmail || !reqPassword) {
    return next(new AppError("Please provide email and password", 400));
  }

  /* 2) Checking if user is existing or not */
  const user = await User.findOne({ email: reqEmail }).select("+password");

  if (!user || !(await user.correctPassword(reqPassword, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  /* 3) If everything is OK, send token to client */
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  /* 1) Getting token and checking whether it's there or not */
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  /* 2) Verification of JWT */
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  /* 3) Check if user still exists */
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token does no longer exists")
    );
  }

  /* 4) Check if user changed their password after token issued */
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "User has recently changed their password. Please log in again"
      )
    );
  }

  /* Grant access to protected route */
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  /* 1) Get user from collection */
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new AppError("User is not logged in"));
  }

  /* 2) Check if posted password is correct */
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Current password is wrong!", 401));
  }

  /* 3) If correct update password */
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  /* 4) Log user in, send back JWT */
  createSendToken(user, 200, res);
});
