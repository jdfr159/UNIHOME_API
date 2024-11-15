'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarioInmobiliaria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuarioInmobiliaria.init({
    id_persona: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usuarioInmobiliaria',
  });
  return usuarioInmobiliaria;
};