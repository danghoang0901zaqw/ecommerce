const { checkSchema } = require("express-validator");
const {
  ROLE_VALIDATION_MESSAGES,
  PERMISSION_VALIDATION_MESSAGES,
  COMMON_VALIDATION_MESSAGES,
} = require("../constants/messages");
const validate = require("../utils/validate");

const permissionsValidation = validate(
  checkSchema(
    {
      permissions: {
        isArray: {
          options: { min: 1 },
          errorMessage: PERMISSION_VALIDATION_MESSAGES.PERMISSION_IS_REQUIRED,
        },
        custom: {
          options: (val) => {
            const isValid = [...new Set(val)].every(
              (i) => typeof i === "string" && i.trim().length > 0,
            );
            if (!isValid) {
              throw new Error(
                PERMISSION_VALIDATION_MESSAGES.PERMISSION_IS_STRING,
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

const getPermissionsValidation = validate(
  checkSchema(
    {
      page: {
        optional: true,
        isNumeric: { errorMessage: COMMON_VALIDATION_MESSAGES.PAGE_INVALID },
        isInt: {
          options: { min: 1 },
          errorMessage: COMMON_VALIDATION_MESSAGES.PAGE_MIN,
        },
      },
      limit: {
        optional: true,
        isNumeric: { errorMessage: COMMON_VALIDATION_MESSAGES.PAGE_INVALID },
        isInt: {
          options: { min: 1 },
          errorMessage: COMMON_VALIDATION_MESSAGES.PAGE_MIN,
        },
      },
    },
    ["body"],
  ),
);

const permissionIdValidation = validate(
  checkSchema(
    {
      permissionId: {
        notEmpty: {
          errorMessage: PERMISSION_VALIDATION_MESSAGES.PERMISSION_ID_IS_REQUIRED,
        },
        isUUID: {
          errorMessage: PERMISSION_VALIDATION_MESSAGES.PERMISSION_ID_IS_STRING,
        },
      },
    },
    ["params"],
  ),
);

const permissionNameValidation = validate(
  checkSchema(
    {
      permissionName: {
        notEmpty: {
          errorMessage: PERMISSION_VALIDATION_MESSAGES.PERMISSION_NAME_REQUIRED,
        },
      },
    },
    ["body"],
  ),
);
const permissionIdsValidation = validate(
  checkSchema(
    {
      permissionIds: {
        isArray: {
          options: { min: 1 },
          errorMessage:
            PERMISSION_VALIDATION_MESSAGES.PERMISSION_ID_IS_REQUIRED,
        },
        custom: {
          options: (val) => {
            const isValid = [...new Set(val)].every(
              (i) => typeof i === "string",
            );
            if (!isValid) {
              throw new Error(
                PERMISSION_VALIDATION_MESSAGES.PERMISSION_ID_IS_STRING,
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

module.exports = {
  permissionsValidation,
  getPermissionsValidation,
  permissionIdValidation,
  permissionIdsValidation,
  permissionNameValidation,
};
