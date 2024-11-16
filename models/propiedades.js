'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Propiedades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Propiedades.init({
    tipo: DataTypes.STRING,
    direccion: DataTypes.STRING,
    barrio: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    habitaciones: DataTypes.INTEGER,
    banos: DataTypes.INTEGER,
    area: DataTypes.DECIMAL,
    descripcion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Propiedades',
  });
  return Propiedades;
};