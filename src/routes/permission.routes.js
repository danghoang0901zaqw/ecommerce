const { Router } = require("express");
const {
  permissionsValidation,
  permissionIdValidation,
  permissionNameValidation,
  getPermissionsValidation,
} = require("../validations/permission.validations");
const { isAuthorized } = require("../middlewares/auth.middleware");
const permissionControllers = require("../controllers/permission.controllers");
const catchAsync = require("../middlewares/catchAsync.middleware");

const permissionRouter = Router();

permissionRouter.use(isAuthorized);
permissionRouter
  .route("/")
  .get(
    getPermissionsValidation,
    catchAsync(permissionControllers.getPermissions),
  )
  .post(
    permissionsValidation,
    catchAsync(permissionControllers.createPermissions),
  );

permissionRouter
  .route("/:permissionId")
  .put(
    permissionIdValidation,
    permissionNameValidation,
    catchAsync(permissionControllers.updatePermission),
  )
  .delete(
    permissionIdValidation,
    catchAsync(permissionControllers.deletePermission),
  );
module.exports = permissionRouter;
