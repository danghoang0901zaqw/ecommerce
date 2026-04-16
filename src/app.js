const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

const instance = require("./databases/config/connectDB");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init routes
app.use(routes);

// handle errors
app.use(errorHandler);

// connect to database
instance.connect();

module.exports = app;
