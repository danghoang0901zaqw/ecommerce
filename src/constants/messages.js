const { UNAUTHORIZED } = require("./statusCode");

const COMMON_VALIDATION_MESSAGES = {
  PAGE_INVALID: "Page must be a number.",
  PAGE_MIN: "Page must be at least 1.",
  LIMIT_INVALID: "Limit must be a number.",
  LIMIT_MIN: "Limit must be at least 1.",
};
const AUTH_MESSAGES = {
  UNAUTHORIZED: "Unauthorized.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_EXISTS: "Email already exists.",
  EMAIL_NOT_FOUND: "Email not found.",
  USER_NOT_FOUND: "User not found.",
  ACCOUNT_LOCKED: "Your account has been locked. Please contact support.",
  PASSWORD_RESET_SUCCESS:
    "Password reset successful. Please check your email for further instructions.",
  TOKEN_EXPIRED: "Your session has expired. Please log in again.",
};

const AUTH_VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_INVALID: "Please enter a valid email address.",
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters long.",
  PASSWORD_TOKEN_REQUIRED: "Password reset token is required.",
  FIRST_NAME_REQUIRED: "First name is required.",
  LAST_NAME_REQUIRED: "Last name is required.",
  VERIFY_TOKEN_REQUIRED: "Verification token is required.",
  USER_ID_REQUIRED: "User ID is required.",
  USER_ID_INVALID: "User ID invalid.",
  USER_ID_MISMATCH: "User ID in token does not match the requested user ID.",
};

const ROLE_MESSAGES = {
  ROLE_EXISTS: "Role already exists.",
  ROLE_NOT_FOUND: "Role not found.",
  PERMISSION_NOT_FOUND: "One or more permissions not found.",
};

const ROLE_VALIDATION_MESSAGES = {
  ROLE_NAME_REQUIRED: "Role name is required.",
  ROLE_ID_REQUIRED: "Role ID is required.",
  ROLE_ID_INVALID: "Role ID is invalid.",
  ROLE_IDS_REQUIRED: "Role IDs are required.",
  ROLE_IDS_INVALID: "Role IDs must be valid UUIDs.",
};

const PERMISSION_MESSAGES = {
  PERMISSION_NOT_FOUND: "Permission not found.",
  PERMISSION_EXISTS: "Permission already exists.",
};

const PERMISSION_VALIDATION_MESSAGES = {
  PERMISSION_ID_IS_REQUIRED: "Permission ID is required.",
  PERMISSION_ID_IS_STRING: "Permission ID value must be a string",
  PERMISSION_NAME_REQUIRED: "Permission name is required.",
};

const USER_MESSAGES = {
  USER_NOT_FOUND: "User not found.",
  USER_ALREADY_VERIFIED: "Account is already verified.",
};

const USER_VALIDATION_MESSAGES = {
  USER_ID_REQUIRED: "User ID is required.",
  USER_ID_INVALID: "User ID is invalid.",
};

module.exports = {
  AUTH_MESSAGES,
  AUTH_VALIDATION_MESSAGES,
  ROLE_MESSAGES,
  ROLE_VALIDATION_MESSAGES,
  PERMISSION_MESSAGES,
  PERMISSION_VALIDATION_MESSAGES,
  USER_MESSAGES,
  USER_VALIDATION_MESSAGES,
  COMMON_VALIDATION_MESSAGES,
};
