const { Op } = require("sequelize");
const db = require("../databases/models");
const STATUS_CODE = require("../constants/statusCode");
const AppError = require("../utils/appError");
const {
  ROLE_MESSAGES,
  PERMISSION_MESSAGES,
  USER_MESSAGES,
} = require("../constants/messages");

class UserServices {
  async attachRole({ userId, roleIds }) {
    const existingRoles = await db.Role.findAll({
      where: { roleId: { [Op.in]: roleIds } },
      attributes: ["roleId"],
    });
    if (existingRoles.length !== roleIds.length) {
      throw new AppError(ROLE_MESSAGES.ROLE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const alreadyAssigned = await db.UserRole.findAll({
      where: { userId, roleId: { [Op.in]: roleIds } },
      attributes: ["roleId"],
    });
    if (alreadyAssigned.length > 0) {
      const assigned = alreadyAssigned.map((r) => r.roleId);
      throw new AppError(
        `Roles already assigned: ${assigned.join(", ")}`,
        STATUS_CODE.BAD_REQUEST,
      );
    }
    const t = await db.sequelize.transaction();
    try {
      const results = await Promise.all(
        roleIds.map((roleId) =>
          db.UserRole.create({ userId, roleId }, { transaction: t }),
        ),
      );
      await t.commit();
      return results;
    } catch (error) {
      if (!t.finished) await t.rollback();
      throw error;
    }
  }

  async attachPermission({ userId, permissionIds }) {
    const existingPermissions = await db.Permission.findAll({
      where: { permissionId: { [Op.in]: permissionIds } },
      attributes: ["permissionId"],
    });
    if (existingPermissions.length !== permissionIds.length) {
      throw new AppError(
        PERMISSION_MESSAGES.PERMISSION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }
    const alreadyAssigned = await db.UserPermission.findAll({
      where: { userId, permissionId: { [Op.in]: permissionIds } },
      attributes: ["permissionId"],
    });
    if (alreadyAssigned.length > 0) {
      const assigned = alreadyAssigned.map((p) => p.permissionId);
      throw new AppError(
        `Permissions already assigned: ${assigned.join(", ")}`,
        STATUS_CODE.BAD_REQUEST,
      );
    }
    const t = await db.sequelize.transaction();
    try {
      const results = await Promise.all(
        permissionIds.map((permissionId) =>
          db.UserPermission.create(
            { userId, permissionId },
            { transaction: t },
          ),
        ),
      );
      await t.commit();
      return results;
    } catch (error) {
      if (!t.finished) await t.rollback();
      throw error;
    }
  }

  async deleteRole({ userId, roleId }) {
    const record = await db.UserRole.findOne({
      where: { userId, roleId },
    });
    if (!record) {
      throw new AppError(ROLE_MESSAGES.ROLE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    await record.destroy();
    return true;
  }

  async deletePermission({ userId, permissionId }) {
    const record = await db.UserPermission.findOne({
      where: { userId, permissionId },
    });
    if (!record) {
      throw new AppError(
        PERMISSION_MESSAGES.PERMISSION_NOT_FOUND,
        STATUS_CODE.NOT_FOUND,
      );
    }
    await record.destroy();
    return true;
  }
}
module.exports = new UserServices();
