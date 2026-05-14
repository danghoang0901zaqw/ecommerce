"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AttributeVariants", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attributeId: {
        type: Sequelize.UUID,
        references: {
          model: "Attributes",
          key: "attributeId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      productVariantId: {
        type: Sequelize.UUID,
        references: {
          model: "ProductVariants",
          key: "productVariantId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    await queryInterface.dropTable("AttributeVariants");
  },
};
