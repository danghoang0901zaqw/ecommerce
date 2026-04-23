const db = require("../databases/models");
const AppError = require("../utils/appError");
const { ROLE_MESSAGES } = require("../constants/messages");
const STATUS_CODE = require("../constants/statusCode");
const permissionServices = require("./permission.services");

class RoleServices {
  async createRole({ roleName }) {
    const isExistRole = await db.Role.findOne({ where: { roleName } });
    if (isExistRole) {
      throw new AppError(ROLE_MESSAGES.ROLE_EXISTS, STATUS_CODE.BAD_REQUEST);
    }
    const result = await db.Role.create({ roleName });
    return result.get({ plain: true });
  }

  async getRoles({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { count, rows } = await db.Role.findAndCountAll({
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

  async updateRole({ roleId, roleName }) {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      throw new AppError(ROLE_MESSAGES.ROLE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    await role.update({ roleName });
    return role.get({ plain: true });
  }

  async attachPermission({ roleId, permissions }) {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      throw new AppError(ROLE_MESSAGES.ROLE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    const roleData = role.get({ plain: true });
    const t = await db.sequelize.transaction();
    try {
      const savedPermissions =
        await permissionServices.createPermission(permissions);
      const requests = [];
      for (const permission of savedPermissions) {
        requests.push(
          db.RolePermission.create(
            {
              roleId: roleData.roleId,
              permissionId: permission.permissionId,
            },
            {
              transaction: t,
            },
          ),
        );
      }
      const results = await Promise.all(requests);
      await t.commit();
      return results;
    } catch (error) {
      if (!t.finished) await t.rollback();
      throw error;
    }
  }

  async deleteRole(roleId) {
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      throw new AppError(ROLE_MESSAGES.ROLE_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }
    await role.destroy({ where: roleId });
    return true;
  }
}

module.exports = new RoleServices();
