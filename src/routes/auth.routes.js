const { Router } = require("express");
const catchAsync = require("../middlewares/catchAsync.middleware");
const authControllers = require("../controllers/auth.controllers");
const {
  signUpValidation,
  resetPasswordValidation,
  verifyForgotPasswordTokenValidation,
  forgotPasswordValidation,
} = require("../validations/auth.validations");

const authRouter = Router();

authRouter.post("/sign-in", catchAsync(authControllers.signIn));

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
module.exports = authRouter;
