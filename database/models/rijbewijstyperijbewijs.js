'use strict';
import Model from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class rijbewijstyperijbewijs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
    rijbewijstyperijbewijs.init({
        rtrId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        rtrRijbewijsId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'rijbewijzen',
                key: 'rijId'
            },
            allowNull: false
        },
        rtrRijbewijsType: {
            type: DataTypes.INTEGER,
            references: {
                model: 'rijbewijstypes',
                key: 'rbtId'
            },
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'rijbewijstyperijbewijs',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'rijbewijstyperijbewijzen'
  });
  return rijbewijstyperijbewijs;
};