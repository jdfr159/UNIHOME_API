'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntidadInmobiliaria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EntidadInmobiliaria.belongsTo(models.Persona, { foreignKey: 'id_persona', as: 'persona' });
    }
  }
  EntidadInmobiliaria.init({
    id_persona:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Persona', // nombre del modelo
        key: 'id'         // clave primaria en Persona
      },
      allowNull: false
    },
    documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'EntidadInmobiliaria',
  });
  return EntidadInmobiliaria;
};