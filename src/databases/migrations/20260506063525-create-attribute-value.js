"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AttributeValues", {
      attributeValueId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
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
      value: {
        type: Sequelize.STRING(100),
        allowNull: false,
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
    await queryInterface.dropTable("AttributeValues");
  },
};
