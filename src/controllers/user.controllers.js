const STATUS_CODE = require("../constants/statusCode");
const userServices = require("../services/user.services");

class UserControllers {
  async getRoles(req, res, next) {
    const { userId } = req.user;
    const { roleId } = req.body;
    const result = await userServices.getRoles({
      userId,
    });
    return res.status(STATUS_CODE.CREATED).json({
      data: result,
    });
  }
  async attachRole(req, res, next) {
    const { userId } = req.params;
    const { roleIds } = req.body;
    const result = await userServices.attachRole({ userId, roleIds });
    return res.status(STATUS_CODE.CREATED).json({
      data: result,
    });
  }

  async attachPermission(req, res, next) {
    const { userId } = req.params;
    const { permissionIds } = req.body;
    const result = await userServices.attachPermission({
      userId,
      permissionIds,
    });
    return res.status(STATUS_CODE.CREATED).json({
      data: result,
    });
  }
  async deleteRole(req, res, next) {
    const { userId, roleId } = req.params;
    const result = await userServices.deleteRole({ userId, roleId });
    return res.status(STATUS_CODE.OK).json({ data: result });
  }

  async deletePermission(req, res, next) {
    const { userId, permissionId } = req.params;
    const result = await userServices.deletePermission({
      userId,
      permissionId,
    });
    return res.status(STATUS_CODE.OK).json({ data: result });
  }
}
module.exports = new UserControllers();
