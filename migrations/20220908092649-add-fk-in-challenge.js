"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Challenges", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        key: "id",
        model: "Users",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Challenges", "UserId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
