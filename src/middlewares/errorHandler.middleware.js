const STATUS_CODE = require("../constants/statusCode");

const sendErrorDev = (err, res) => {
  const status = err.status || STATUS_CODE.INTERNAL_SERVER_ERROR;
  res.status(status).json({
    status,
    message: err.message,
    errors: err.errors || undefined,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  const status = err.status || STATUS_CODE.INTERNAL_SERVER_ERROR;
  res.status(status).json({
    status,
    message: err.message,
    errors: err.errors || undefined,
  });
};

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

module.exports = errorHandler;
