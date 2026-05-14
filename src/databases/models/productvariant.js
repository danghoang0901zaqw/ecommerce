"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductVariant.init(
    {
      productVariantId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      variantName: {
        type: DataTypes.STRING,
      },
      variantDescription: {
        type: DataTypes.STRING,
      },
      sku: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      imageUrl: {
        type: DataTypes.STRING(500),
      },
    },
    {
      sequelize,
      modelName: "ProductVariant",
    },
  );
  return ProductVariant;
};
