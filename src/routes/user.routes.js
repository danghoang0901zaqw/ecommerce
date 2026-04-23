const { Router } = require("express");
const { isAuthorized } = require("../middlewares/auth.middleware");
const userControllers = require("../controllers/user.controllers");
const { userIdValidation } = require("../validations/user.validations");
const {
  roleIdValidation,
  roleIdsValidation,
} = require("../validations/role.validations");
const {
  permissionIdsValidation,
  permissionIdValidation,
} = require("../validations/permission.validations");

const userRouter = Router();

userRouter.use(isAuthorized);
userRouter
  .route("/:userId/roles")
  .get(userIdValidation, userControllers.getRoles)
  .post(userIdValidation, roleIdsValidation, userControllers.attachRole);

userRouter.delete(
  "/:userId/roles/:roleId",
  userIdValidation,
  roleIdValidation,
  userControllers.deleteRole,
);

userRouter
  .route("/:userId/permissions")
  .post(
    userIdValidation,
    permissionIdsValidation,
    userControllers.attachPermission,
  );

userRouter.delete(
  "/:userId/permissions/:permissionId",
  userIdValidation,
  permissionIdValidation,
  userControllers.deletePermission,
);

module.exports = userRouter;
