"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CategoryAttributes", {
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
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: "Categories",
          key: "categoryId",
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
    await queryInterface.dropTable("CategoryAttributes");
  },
};
