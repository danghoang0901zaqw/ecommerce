"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductImage.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: "Products",
          key: "productId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      url: {
        type: DataTypes.STRING(500),
      },
      isPrimary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sortOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "ProductImage",
    },
  );
  return ProductImage;
};
