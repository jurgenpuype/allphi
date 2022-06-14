'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voertuigen', {
      voeId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
        voeMerk: {
            allowNull: false,
            type: Sequelize.STRING(50)
      },
        voeModel: {
            allowNull: false,
            type: Sequelize.STRING(50)
      },
        voeChasisnummer: {
            allowNull: false,
            type: Sequelize.STRING(17),
            unique: true
      },
      voeNummerplaat: {
          type: Sequelize.STRING(8),
          allowNull: false,
          unique: true
      },
      voeKleur: {
          type: Sequelize.STRING(20)
      },
      voeAantalDeuren: {
          type: Sequelize.TINYINT
      }
    },
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('voertuigen');
  }
};