const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");
const STATUS_CODE = require("../constants/statusCode");

const validate = (validations) => {
  return async (req, res, next) => {
    await validations.run(req);
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const errorObject = errors.mapped();
    for (const key in errorObject) {
      const { msg } = errorObject[key];
      throw new AppError(msg, STATUS_CODE.UNPROCESSABLE_ENTITY);
    }
    next();
  };
};

module.exports = validate;
