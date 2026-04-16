const { Router } = require("express");
const catchAsync = require("../middlewares/catchAsync.middleware");
const authControllers = require("../controllers/auth.controllers");
const { signUpValidation } = require("../validations/auth.validations");

const authRouter = Router();

authRouter.post("/sign-in", catchAsync(authControllers.signIn));

authRouter.post(
  "/sign-up",
  signUpValidation,
  catchAsync(authControllers.signUp),
);

module.exports = authRouter;
