const STATUS_CODE = require("../constants/statusCode");
const roleServices = require("../services/role.services");

class RoleControllers {
  async createRole(req, res, next) {
    const { roleName } = req.body;
    const result = await roleServices.createRole({ roleName });
    return res.status(STATUS_CODE.CREATED).json({
      data: result,
    });
  }

  async getRoles(req, res, next) {
    const { page, limit } = req.params;
    const result = await roleServices.getRoles({
      page: +page || 1,
      limit: +limit || 10,
    });
    return res.status(STATUS_CODE.OK).json({
      ...result,
    });
  }

  async attachPermission(req, res, next) {
    const { roleId } = req.params;
    const { permissions } = req.body;
    const result = await roleServices.attachPermission({ roleId, permissions });
    return res.status(STATUS_CODE.CREATED).json({
      data: result,
    });
  }
  async updateRole(req, res, next) {
    const { roleId } = req.params;
    const { roleName } = req.body;
    const result = await roleServices.updateRole({ roleId, roleName });
    return res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }

  async deleteRole(req, res, next) {
    const { roleId } = req.params;
    const result = await roleServices.deleteRole(roleId);
    return res.status(STATUS_CODE.OK).json({
      data: result,
    });
  }
}
module.exports = new RoleControllers();
