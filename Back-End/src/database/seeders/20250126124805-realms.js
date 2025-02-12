'use strict';
const realms = require('../../data/realms.json')

const realmDB = realms.map(realm => ({
  id: realm.id,
  name: realm.name,
  image: realm.image,
  createdAt: new Date(),
  updatedAt: new Date()
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Realms', realmDB, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Realms', null, {});
  }
};
