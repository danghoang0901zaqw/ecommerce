const { UNAUTHORIZED } = require("./statusCode");

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
  USER_ID_MISMATCH: "User ID in token does not match the requested user ID.",
};

module.exports = {
  AUTH_MESSAGES,
  AUTH_VALIDATION_MESSAGES,
};
