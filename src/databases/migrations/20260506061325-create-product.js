"use strict";
const { PRODUCT_STATUS } = require("../../constants/enum");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      productId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      productName: {
        type: Sequelize.STRING,
      },
      productDescription: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: "Categories",
          key: "categoryId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      shopId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      productStatus: {
        type: Sequelize.ENUM(...Object.values(PRODUCT_STATUS)),
        defaultValue: PRODUCT_STATUS.ACTIVE,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
