"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Submissions", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        key: "id",
        model: "Users",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("Submissions", "ChallengeId", {
      type: Sequelize.INTEGER,
      references: {
        key: "id",
        model: "Challenges",
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
    await queryInterface.removeColumn("Submissions", "UserId");
    await queryInterface.removeColumn("Submissions", "ChallengeId");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
