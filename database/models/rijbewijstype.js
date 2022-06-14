'use strict';
import Model from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class rijbewijstype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rijbewijstype.belongsToMany(models.rijbewijs, { through: 'rijbewijstyperijbewijzen' });
      rijbewijstype.hasMany(models.voertuig);
    }
  }
    rijbewijstype.init({
        rbtId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        rbtNaam: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false
        },
        rbtOmschrijving: {
            type: DataTypes.STRING(50)
        }
    }, {
        sequelize,
        modelName: 'rijbewijstype',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'rijbewijstypes'
  });
  return rijbewijstype;
};