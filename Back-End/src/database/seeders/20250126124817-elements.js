'use strict';
const elements = ["Agua", "Tierra", "Fuego", "Aire"]

const elementDB = elements.map(element => {
  return {
    name : element,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Elements', elementDB, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Elements', null, {})
  }
};
