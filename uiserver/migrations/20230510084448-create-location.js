"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      runningInfoId: {
        type: Sequelize.INTEGER,
      },
      longitude: {
        type: Sequelize.FLOAT,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
      speed: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locations");
  },
};
