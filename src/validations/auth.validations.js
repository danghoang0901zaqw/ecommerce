const { checkSchema } = require("express-validator");
const validate = require("../utils/validate");
const { AUTH_VALIDATION_MESSAGES } = require("../constants/messages");
const AppError = require("../utils/appError");
const STATUS_CODE = require("../constants/statusCode");

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

const signInValidation = validate(
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
      password: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.PASSWORD_REQUIRED,
        },
      },
    },
    ["body"],
  ),
);

const forgotPasswordValidation = validate(
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
    },
    ["body"],
  ),
);

const verifyForgotPasswordTokenValidation = validate(
  checkSchema(
    {
      token: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.PASSWORD_TOKEN_REQUIRED,
        },
      },
    },
    ["query"],
  ),
);

const resetPasswordValidation = validate(
  checkSchema(
    {
      token: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.PASSWORD_TOKEN_REQUIRED,
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
const sendVerifyAccountValidation = validate(
  checkSchema(
    {
      userId: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.USER_ID_REQUIRED,
        },
        isUUID: {
          errorMessage: AUTH_VALIDATION_MESSAGES.USER_ID_INVALID,
        },
        custom: {
          options: (value, { req }) => {
            const currentUserId = req?.user?.userId;
            if (value !== currentUserId) {
              throw new AppError(
                AUTH_VALIDATION_MESSAGES.USER_ID_MISMATCH,
                STATUS_CODE.BAD_REQUEST,
              );
            }
            return true;
          },
        },
      },
    },
    ["body"],
  ),
);

const verifyAccountValidation = validate(
  checkSchema(
    {
      token: {
        notEmpty: {
          errorMessage: AUTH_VALIDATION_MESSAGES.VERIFY_TOKEN_REQUIRED,
        },
      },
    },
    ["query"],
  ),
);

const refreshTokenValidation = validate(
  checkSchema({
    refreshToken: {
      notEmpty: {
        errorMessage: AUTH_VALIDATION_MESSAGES.PASSWORD_TOKEN_REQUIRED,
      },
    },
  }),
);

module.exports = {
  signUpValidation,
  signInValidation,
  forgotPasswordValidation,
  verifyForgotPasswordTokenValidation,
  resetPasswordValidation,
  sendVerifyAccountValidation,
  verifyAccountValidation,
  refreshTokenValidation,
};
