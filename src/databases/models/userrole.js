"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsTo(models.User, { foreignKey: "userId" });
      UserRole.belongsTo(models.Role, { foreignKey: "roleId" });
    }
  }
  UserRole.init(
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
    },
    {
      sequelize,
      modelName: "UserRole",
    },
  );
  return UserRole;
};
