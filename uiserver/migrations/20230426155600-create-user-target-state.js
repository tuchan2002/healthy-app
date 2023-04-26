"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usertarget_states", {
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
      usertarget_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gotUpAt: {
        type: Sequelize.DATE,
      },
      sleepedAt: {
        type: Sequelize.DATE,
      },
      kcal: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      footsteps_amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('usertarget_states');
  },
};
