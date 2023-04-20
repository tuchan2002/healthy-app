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
    await queryInterface.bulkInsert('targets', [
      {
        content: "Giảm Mỡ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Tăng Cơ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Định Hình",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "Giãn Cơ",
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
    await queryInterface.bulkDelete('targets', null, {});
  }
};
