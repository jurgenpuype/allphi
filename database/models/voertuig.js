'use strict';
import Model from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class voertuig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        voertuig.belongsTo(models.brandstof, { foreignKey: 'voeBrandstoftype' });
        voertuig.belongsTo(models.voertuigtype, { foreignKey: 'voeVoertuigtype' });
        voertuig.belongsTo(models.rijbewijstype, { foreignKey: 'voeRijbewijs' });
        voertuig.hasOne(models.bestuurder);
    }
  }
    voertuig.init({
        voeId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        voeMerk: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },
        voeModel: {
            allowNull: false,
            type: DataTypes.STRING(50)
        },
        voeChasisnummer: {
            allowNull: false,
            type: DataTypes.STRING(17),
            unique: true
        },
        voeNummerplaat: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true
        },
        voeBrandstoftype: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'brandstoffen',
                key: 'bravId'
            }
        },
        voeVoertuigtype: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'voertuigtypes',
                key: 'voetId'
            }
        },
        voeRijbewijs: {
            type: Sequelize.INTEGER,
            references: {
                model: 'rijbewijstypes',
                key: 'rbtId'
            },
            allowNull: false
        },
        voeKleur: {
            type: DataTypes.STRING(20)
        },
        voeAantalDeuren: {
            type: DataTypes.TINYINT
        }

    }, {
        sequelize,
        modelName: 'voertuig',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        tableName: 'voertuigen'
  });
};