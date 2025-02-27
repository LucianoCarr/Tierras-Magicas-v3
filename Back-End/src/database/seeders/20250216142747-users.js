'use strict';

const userStructure = [
  {
    name: "Luciano",
    lastName: "Carrizo",
    email: "luciano@gmail.com",
    password: "123123",
    createdAt : new Date,
    updatedAt : new Date
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", userStructure, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
