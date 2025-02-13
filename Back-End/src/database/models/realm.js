'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Realm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Realm.hasMany(models.Character, {
        as:"characters",
        foreignKey: "realmId"
      })
    }
  }
  Realm.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Realm',
  });
  return Realm;
};