'use strict';
const characters = require('../../data/characters.json')
const realms = require('../../data/realms.json')

const realmJson = {};
realms.forEach(realm => {
  realmJson[realm.name] = realm.id;
});

const elementArray = {
  "Agua": 1,
  "Tierra": 2,
  "Fuego": 3,
  "Aire": 4
};

const characterDB = characters.map(character => ({
  id: character.id,
  name: character.name,
  image: character.image,
  realmId: realmJson[character.realm],
  elementId: elementArray[character.element],
  power: character.power,
  description: character.description,
  createdAt: new Date(),
  updatedAt: new Date()
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('characters', characterDB, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characters', null, {});
  }
};
