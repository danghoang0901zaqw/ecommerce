"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RolePermissions", {
      roleId: {
        type: Sequelize.UUID,
        references: {
          model: "Roles",
          key: "roleId",
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
    await queryInterface.addConstraint("RolePermissions", {
      fields: ["roleId", "permissionId"],
      type: "primary key",
      name: "PK_RolePermissions",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RolePermissions");
  },
};
