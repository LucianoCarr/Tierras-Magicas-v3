'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Character.belongsTo(models.Realm, {
        as:"realms",
        foreignKey:"realmId"
      }),
      Character.belongsTo(models.Element, {
        as:"elements",
        foreignKey:"elementId"
      })
    }
  }
  Character.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    realmId: DataTypes.INTEGER,
    power: DataTypes.INTEGER,
    elementId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};