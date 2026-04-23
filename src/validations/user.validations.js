const { checkSchema } = require("express-validator");
const { USER_VALIDATION_MESSAGES } = require("../constants/messages");
const validate = require("../utils/validate");
const AppError = require("../utils/appError");
const STATUS_CODE = require("../constants/statusCode");

const userIdValidation = validate(
  checkSchema(
    {
      userId: {
        notEmpty: {
          errorMessage: USER_VALIDATION_MESSAGES.USER_ID_REQUIRED,
        },
        isUUID: {
          errorMessage: USER_VALIDATION_MESSAGES.USER_ID_INVALID,
        },
      },
    },
    ["params"],
  ),
);

module.exports = {
  userIdValidation,
};
