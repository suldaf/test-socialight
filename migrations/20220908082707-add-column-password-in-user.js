"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("Users", "password", {
      type: Sequelize.STRING,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("Users", "password");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
