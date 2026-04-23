const { Router } = require("express");

const roleControllers = require("../controllers/role.controllers");
const { isAuthorized } = require("../middlewares/auth.middleware");
const {
  roleNameValidation,
  roleIdValidation,
  getRolesValidation,
} = require("../validations/role.validations");
const {
  permissionsValidation,
} = require("../validations/permission.validations");
const catchAsync = require("../middlewares/catchAsync.middleware");
const roleRouter = Router();

roleRouter.use(isAuthorized);
roleRouter
  .route("/")
  .get(getRolesValidation, catchAsync(roleControllers.getRoles))
  .post(roleNameValidation, catchAsync(roleControllers.createRole));

roleRouter
  .route("/:roleId/permissions")
  .post(
    roleIdValidation,
    permissionsValidation,
    catchAsync(roleControllers.attachPermission),
  );

roleRouter
  .route("/:roleId")
  .put(
    roleIdValidation,
    roleNameValidation,
    catchAsync(roleControllers.updateRole),
  )
  .delete(roleIdValidation, catchAsync(roleControllers.deleteRole));

module.exports = roleRouter;
