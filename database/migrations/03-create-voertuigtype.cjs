'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('voertuigtypes', {
      voetId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voetNaam: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false
      },
      voetOmschrijving: {
        type: Sequelize.STRING(100)
      }
    },
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('voertuigtypes');
  }
};