"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RolePermission.belongsTo(models.Role, { foreignKey: "roleId" });
      RolePermission.belongsTo(models.Permission, { foreignKey: "permissionId" });
    }
  }
  RolePermission.init(
    {
      roleId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: "Roles",
          key: "roleId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      permissionId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: "Permissions",
          key: "permissionId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "RolePermission",
    },
  );
  return RolePermission;
};
