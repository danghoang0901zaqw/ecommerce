const { Op } = require("sequelize");
const db = require("../databases/models");
const { PERMISSION_MESSAGES } = require("../constants/messages");
const STATUS_CODE = require("../constants/statusCode");
const AppError = require("../utils/appError");

class PermissionServices {
  async getPermissions({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { count, rows } = await db.Permission.findAndCountAll({
      where: {},
      offset,
      limit,
    });
    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
      },
    };
  }
  async createPermission(permissions) {
    const existing = await db.Permission.findAll({
      where: { permissionName: { [Op.in]: permissions } },
      attributes: ["permissionName"],
    });
    if (existing.length > 0) {
      const existingNames = existing.map((p) => p.permissionName);
      throw new AppError(
        `Permissions already exist: ${existingNames.join(", ")}`,
        STATUS_CODE.CONFLICT,
      );
      return;
    }
    const t = await db.sequelize.transaction();
    try {
      const requests = permissions.map((permissionName) =>
        db.Permission.create({ permissionName }, { transaction: t }),
      );
      const results = await Promise.all(requests);
      await t.commit();
      return results;
    } catch (error) {
      if (!t.finished) await t.rollback();
      throw error;
    }
  }
  async updatePermission({ permissionId, permissionName }) {
    const permission = await db.Permission.findByPk(permissionId);
    if (!permission) {
      throw new AppError(
        PERMISSION_MESSAGES.PERMISSION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }
    await permission.update({ permissionName });
    return permission.get({ plain: true });
  }

  async deletePermission(permissionId) {
    const permission = await db.Permission.findByPk(permissionId);
    if (!permission) {
      throw new AppError(
        PERMISSION_MESSAGES.PERMISSION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }
    await db.Permission.destroy({
      where: {
        permissionId,
      },
    });
    return true
  }
}
module.exports = new PermissionServices();
