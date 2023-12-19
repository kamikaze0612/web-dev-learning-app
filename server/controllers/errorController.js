const AppError = require("../utils/AppError");

/* CastError Handler */
const handleCastErrorMongoDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  /* Returning new App Error */
  return new AppError(message, 400);
};

/* Duplicate field error Handler */
const handleDuplicateFieldsMongoDB = (err) => {
  const message = `Duplicate field value: (${err.keyValue.name}). Please use another value!`;

  /* Returning new App Error */
  return new AppError(message, 400);
};

/* ValidationError Handler */
const handleValidationErrorMongoDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  /* Returning new App Error */
  return new AppError(message, 400);
};

/* Function for sending errors during development */
const sendDevErr = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};

/* Function for sending errors in production */
const sendProdErr = (err, res) => {
  /* Hiding specific details of error from user */
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

/* Global Error Handler function */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevErr(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    /* MongoDB Errors */
    /* CastError in MongoDB when requested id is not valid */
    if (err.name === "CastError") error = handleCastErrorMongoDB(error);

    /* Duplicate unique field error */
    if (err.code === 11000) error = handleDuplicateFieldsMongoDB(error);

    /* ValidationError when data is updated and created with invalid input */
    if (err.name === "ValidationError")
      error = handleValidationErrorMongoDB(error);

    /* JSON Web Token Errors */

    /* Sending error to client */
    sendProdErr(error, res);
  }
};
