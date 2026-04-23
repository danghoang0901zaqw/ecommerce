"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserPermission.belongsTo(models.User, { foreignKey: "userId" });
      UserPermission.belongsTo(models.Permission, { foreignKey: "permissionId" });
    }
  }
  UserPermission.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: "Users",
          key: "userId",
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
      modelName: "UserPermission",
    },
  );
  return UserPermission;
};
