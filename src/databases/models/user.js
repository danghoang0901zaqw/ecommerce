"use strict";
const { randomUUID } = require("crypto");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Token, {
        foreignKey: "userId",
      });
      User.hasMany(models.UserRole, { foreignKey: "userId" });
      User.hasMany(models.UserPermission, { foreignKey: "userId" });
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "userId",
        otherKey: "roleId",
        as: "roles",
      });
      User.belongsToMany(models.Permission, {
        through: models.UserPermission,
        foreignKey: "userId",
        otherKey: "permissionId",
        as: "permissions",
      });
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      verifiedAt: DataTypes.DATE,
      avatar: DataTypes.STRING,
      cover: DataTypes.STRING,
      bio: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
