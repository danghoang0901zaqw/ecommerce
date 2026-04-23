const STATUS_CODE = require("../constants/statusCode");
const permissionServices = require("../services/permission.services");

class PermissionControllers {
  async getPermissions(req, res, next) {
    const { page, limit } = req.params;
    const result = await permissionServices.getPermissions({
      page: +page || 1,
      limit: +limit || 10,
    });
    return res.status(STATUS_CODE.OK).json({
      ...result,
    });
  }
  async createPermissions(req, res, next) {
    const { permissions = [] } = req.body;
    const result = await permissionServices.createPermission(permissions);
    return res.status(STATUS_CODE.CREATED).json({
      data: result,
    });
  }

  async updatePermission(req, res, next) {
    const { permissionId } = req.params;
    const { permissionName } = req.body;
    const result = await permissionServices.updatePermission({
      permissionId,
      permissionName,
    });
    return res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }

  async deletePermission(req, res, next) {
    const { permissionId } = req.params;
    const result = await permissionServices.deletePermission(permissionId);
    return res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
}
module.exports = new PermissionControllers();
