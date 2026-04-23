const { Router } = require("express");

const STATUS_CODE = require("../constants/statusCode");
const AppError = require("../utils/appError");

const authRouter = require("./auth.routes");
const permissionRouter = require("./permission.routes");
const roleRouter = require("./role.routes");
const userRouter = require("./user.routes");

const router = Router();

router.use("/v1/auth", authRouter);
router.use("/v1/roles", roleRouter);
router.use("/v1/permissions", permissionRouter);
router.use("/v1/users/", userRouter);
router.use("", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      STATUS_CODE.NOT_FOUND,
    ),
  );
});

module.exports = router;
