const express = require("express");
const morgan = require("morgan");
const xss = require("xss-clean");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const instructionRouter = require("./routes/instructionRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();

/* 1) GLOBAL MIDDLEWARES */
/* CORS */
app.use(
  cors({
    origin: ["http://localhost:5173", "https://web-dev-learning.netlify.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

/* Set security HTTP headers */
app.use(helmet());

/* Development logging */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* Defining limiter using express-rate-limit */
const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

/* Parsing request's body to json format */
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

/* Data sanitization against NoSQL query injection */
app.use(mongoSanitize());

/* Data sanitization against XSS */
app.use(xss());

/* Prevent parameter pollution (duplicate parameter names etc) */
app.use(hpp());

/* Serving static files */
app.use(express.static(`${__dirname}/public`));

/* 2) ROUTES */
app.use("/api/v1/instructions", instructionRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

/* Global error handling */
app.use(globalErrorHandler);

module.exports = app;
