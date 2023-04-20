'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('bodyparts', [
      {
        content: "Toàn Thân",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Thân Trên",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Thân Giữa",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Thân Dưới",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('bodyparts', null, {});
  }
};
