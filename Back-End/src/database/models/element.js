'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Element extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Element.hasMany(models.Character, {
        as:"characters",
        foreignKey:"elementId"
      })
    }
  }
  Element.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Element',
  });
  return Element;
};