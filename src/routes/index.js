const { Router } = require("express");

const authRouter = require("./auth.routes");
const STATUS_CODE = require("../constants/statusCode");
const AppError = require("../utils/appError");

const router = Router();

router.use("/v1/auth", authRouter);
router.use("", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      STATUS_CODE.NOT_FOUND,
    ),
  );
});

module.exports = router;
