'use strict';
import Model from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class rijbewijs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        rijbewijs.belongsToMany(models.rijbewijstype, { through: 'rijbewijstyperijbewijzen' });
        rijbewijs.hasOne(models.bestuurder);
    }
  }
    rijbewijs.init({
        rijId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        rijNummer: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(50)
        },
        rijAfgifte: {
            allowNull: false,
            type: DataTypes.DATEONLY
        },
        rijGeldigheid: {
            type: DataTypes.DATEONLY
        }
    }, {
        sequelize,
        modelName: 'rijbewijs',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'rijbewijzen'
  });
  return rijbewijs;
};