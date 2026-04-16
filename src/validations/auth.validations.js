const { checkSchema } = require("express-validator");
const validate = require("../utils/validate");
const { AUTH_VALIDATION_MESSAGES } = require("../constants/messages");

const signUpValidation = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.EMAIL_REQUIRED,
        },
        isEmail: {
          errorMessage: AUTH_VALIDATION_MESSAGES.EMAIL_INVALID,
        },
      },
      firstName: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.FIRST_NAME_REQUIRED,
        },
      },
      lastName: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.LAST_NAME_REQUIRED,
        },
      },
      password: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.PASSWORD_REQUIRED,
        },
        isLength: {
          options: { min: 6 },
          errorMessage: AUTH_VALIDATION_MESSAGES.PASSWORD_TOO_SHORT,
        },
      },
    },
    ["body"],
  ),
);

module.exports = {
  signUpValidation,
};
