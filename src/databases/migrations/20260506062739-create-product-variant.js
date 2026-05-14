"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductVariants", {
      productVariantId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: "Products",
          key: "productId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      variantName: {
        type: Sequelize.STRING,
      },
      variantDescription: {
        type: Sequelize.STRING,
      },
      sku: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      imageUrl: {
        type: Sequelize.STRING(500),
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
    await queryInterface.dropTable("ProductVariants");
  },
};
