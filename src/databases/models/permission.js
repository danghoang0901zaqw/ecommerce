"use strict";
const { randomUUID } = require("crypto");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.hasMany(models.RolePermission, {
        foreignKey: "permissionId",
      });
      Permission.hasMany(models.UserPermission, {
        foreignKey: "permissionId",
      });
    }
  }
  Permission.init(
    {
      permissionId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      permissionName: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Permission",
    },
  );
  return Permission;
};
