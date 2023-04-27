"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usertargets", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      getUpAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(2023, 4, 26, 6, 0),
      },
      sleepAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(2023, 4, 26, 23, 0),
      },
      kcal: {
        type: Sequelize.FLOAT,
        defaultValue: 2000,
      },
      footsteps_amount: {
        type: Sequelize.INTEGER,
        defaultValue: 6000,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usertargets");
  },
};
