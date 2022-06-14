'use strict';
import Model from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class voertuigtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
    voertuigtype.init({
        voetId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        voetNaam: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        voetOmschrijving: {
            type: DataTypes.STRING(100)
        }
    }, {
        sequelize,
        modelName: 'voertuigtype',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'voertuigtypes'
  });
  return voertuigtype;
};