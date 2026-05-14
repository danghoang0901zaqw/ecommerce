"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AttributeValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AttributeValue.init(
    {
      attributeValueId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      attributeId: {
        type: DataTypes.UUID,
        references: {
          model: "Attributes",
          key: "attributeId",
        },
      },
      value: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "AttributeValue",
    },
  );
  return AttributeValue;
};
