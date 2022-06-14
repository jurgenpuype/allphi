'use strict';
import Model from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class brandstof extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        brandstof.belongsToMany(models.tankkaart, { through: 'tankkaartbrandstoffen' });
        brandstof.hasMany(models.voertuig);
    }
  }
    brandstof.init(
    {
        bravId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        bravNaam: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false
        },
        bravOmschrijving: {
            type: DataTypes.STRING(50)
        }
    },
        {
            sequelize,
            modelName: 'brandstof',
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
            tableName: 'brandstoffen'
        }
    );
  return brandstof;
};