'use strict';
import Model from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class bestuurder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        bestuurder.belongsTo(models.tankkaart, { foreignKey: 'besTankkaart' });
        bestuurder.belongsTo(models.voertuig, { foreignKey: 'besVoertuig' });
        bestuurder.belongsTo(models.rijbewijs, { foreignKey: 'besRijbewijs' });
    }
  }
    bestuurder.init({
        besId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        besNaam: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        besVoornaam: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        besStraatNr: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        besPostcode: {
            type: DataTypes.STRING(7),
            allowNull: false
        },
        besGemeente: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        besLand: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        besGeboortedatum: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        besRijksregisterNr: {
            type: DataTypes.STRING(15),
            unique: true,
            allowNull: false
        },
        besRijbewijs: {
            type: DataTypes.INTEGER,
            references: {
                model: 'rijbewijs',
                key: 'rijId'
            },
            unique: true,
            allowNull: false
        },
        besVoertuig: {
            type: DataTypes.INTEGER,
            references: {
                model: 'voertuig',
                key: 'voeId'
            },
            unique: true
        },
        besTankkaart: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tankkaart',
                key: 'tanId'
            },
            unique: true
        },
        besVerwijderd: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: 'bestuurder',
            //sequalize houdt een createdAt en updatedAt bij default
            timestamps: false,
            //utf-8 character set
            charset: 'utf8',
            collate: 'utf8_general_ci',
            //tablenaam
            tableName: 'bestuurders'
        }
    );
  return bestuurder;
};