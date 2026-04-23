"use strict";
const { randomUUID } = require("crypto");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.UserRole, { foreignKey: "roleId" });
      Role.hasMany(models.RolePermission, { foreignKey: "roleId" });
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: "roleId",
        otherKey: "permissionId",
        as: "permissions",
      });
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: "roleId",
        otherKey: "userId",
        as: "users",
      });
    }
  }
  Role.init(
    {
      roleId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      roleName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
    },
  );
  return Role;
};
