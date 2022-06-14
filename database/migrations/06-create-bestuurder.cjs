'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bestuurders', {
        besId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        besNaam: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        besVoornaam: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        besStraatNr: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        besPostcode: {
            type: Sequelize.STRING(7),
            allowNull: false
        },
        besGemeente: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        besLand: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        besGeboortedatum: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        besRijksregisterNr: {
            type: Sequelize.STRING(15),
            unique: true,
            allowNull: false
        },
        besVerwijderd: {
            type: Sequelize.TINYINT,
            defaultValue: 0,
            allowNull: false
        }
    },
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bestuurders');
  }
};