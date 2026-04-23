const { checkSchema } = require("express-validator");
const {
  ROLE_VALIDATION_MESSAGES,
  COMMON_VALIDATION_MESSAGES,
} = require("../constants/messages");
const validate = require("../utils/validate");

const roleNameValidation = validate(
  checkSchema(
    {
      roleName: {
        notEmpty: {
          errorMessage: ROLE_VALIDATION_MESSAGES.ROLE_NAME_REQUIRED,
        },
      },
    },
    ["body"],
  ),
);

const getRolesValidation = validate(
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

const roleIdValidation = validate(
  checkSchema(
    {
      roleId: {
        notEmpty: {
          errorMessage: ROLE_VALIDATION_MESSAGES.ROLE_ID_REQUIRED,
        },
        isUUID: {
          errorMessage: ROLE_VALIDATION_MESSAGES.ROLE_ID_REQUIRED,
        },
      },
    },
  ),
);

const roleIdsValidation = validate(
  checkSchema(
    {
      roleIds: {
        isArray: {
          options: { min: 1 },
          errorMessage: ROLE_VALIDATION_MESSAGES.ROLE_IDS_REQUIRED,
        },
        custom: {
          options: (val) => {
            const isValid = [...new Set(val)].every(
              (i) => typeof i === "string" && /^[0-9a-f-]{36}$/i.test(i),
            );
            if (!isValid) {
              throw new Error(ROLE_VALIDATION_MESSAGES.ROLE_IDS_INVALID);
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
  roleNameValidation,
  roleIdValidation,
  roleIdsValidation,
  getRolesValidation,
};
