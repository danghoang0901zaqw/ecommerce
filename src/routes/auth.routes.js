const { Router } = require("express");
const catchAsync = require("../middlewares/catchAsync.middleware");
const authControllers = require("../controllers/auth.controllers");
const {
  signUpValidation,
  resetPasswordValidation,
  verifyForgotPasswordTokenValidation,
  forgotPasswordValidation,
  sendVerifyAccountValidation,
  verifyAccountValidation,
  refreshTokenValidation,
  signInValidation,
} = require("../validations/auth.validations");
const { isAuthorized } = require("../middlewares/auth.middleware");

const authRouter = Router();

authRouter.post(
  "/sign-in",
  signInValidation,
  catchAsync(authControllers.signIn),
);

authRouter.post(
  "/sign-up",
  signUpValidation,
  catchAsync(authControllers.signUp),
);

authRouter.post(
  "/forgot-password",
  forgotPasswordValidation,
  catchAsync(authControllers.forgotPassword),
);

authRouter.post(
  "/verify-forgot-password-token",
  verifyForgotPasswordTokenValidation,
  catchAsync(authControllers.verifyForgotPasswordToken),
);

authRouter.post(
  "/reset-password",
  resetPasswordValidation,
  catchAsync(authControllers.resetPassword),
);

authRouter.post(
  "/send-verify-account",
  isAuthorized,
  sendVerifyAccountValidation,
  catchAsync(authControllers.sendVerifyAccount),
);

authRouter.post(
  "/verify-account",
  verifyAccountValidation,
  catchAsync(authControllers.verifyAccount),
);

authRouter.post(
  "/sign-out",
  isAuthorized,
  refreshTokenValidation,
  catchAsync(authControllers.signOut),
);

authRouter.post(
  "/refresh-token",
  isAuthorized,
  refreshTokenValidation,
  catchAsync(authControllers.refreshToken),
);

module.exports = authRouter;
