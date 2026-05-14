"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryAttribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoryAttribute.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      attributeId: {
        type: DataTypes.UUID,
        references: {
          model: "Attributes",
          key: "attributeId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      categoryId: {
        type: DataTypes.UUID,
        references: {
          model: "Categories",
          key: "categoryId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "CategoryAttribute",
    },
  );
  return CategoryAttribute;
};
