'use strict';
import Model from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class tankkaartbrandstof extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
    tankkaartbrandstof.init({
        tabrId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        tabrTankkaartId: {
            references: {
                model: 'tankkaarten',
                key: 'tanId'
            },
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tabrBrandstofType: {
            references: {
                model: 'brandstoffen',
                key: 'bravId'
            },
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'tankkaartbrandstof',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'tankkaartbrandstoffen'
  });
  return tankkaartbrandstof;
};