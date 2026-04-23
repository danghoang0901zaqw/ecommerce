"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserPermissions", {
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      permissionId: {
        type: Sequelize.UUID,
        references: {
          model: "Permissions",
          key: "permissionId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.addConstraint("UserPermissions", {
      fields: ["userId", "permissionId"],
      type: "primary key",
      name: "PK_UserPermissions",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserPermissions");
  },
};
