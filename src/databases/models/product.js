"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      productId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
    },
    {
      productName: DataTypes.STRING,
    },
    {
      productDescription: DataTypes.STRING,
    },
    {
      price: DataTypes.INTEGER,
    },
    {
      categoryId: DataTypes.UUID,
      references: {
        model: "Categories",
        key: "categoryId",
      },
    },
    {
      brandId: DataTypes.UUID,
      references: {
        model: "Brands",
        key: "brandId",
      },
    },
    {
      shopId: DataTypes.UUID,
      references: {
        model: "Shops",
        key: "shopId",
      },
    },
    {
      isPublished: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    {
      productStatus: DataTypes.ENUM(Object.values(PRODUCT_STATUS)),
      defaultValue: PRODUCT_STATUS.ACTIVE,
    },
    {
      sequelize,
      modelName: "Product",
    },
  );
  return Product;
};
