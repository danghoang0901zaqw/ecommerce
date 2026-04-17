"use strict";
const { Model } = require("sequelize");
const { TOKEN_TYPE } = require("../../constants/enum");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Token.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Token.init(
    {
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      type: {
        type: DataTypes.ENUM(),
        values: Object.values(TOKEN_TYPE),
      },
      token: DataTypes.STRING,
      expiredAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Token",
    },
  );
  return Token;
};
