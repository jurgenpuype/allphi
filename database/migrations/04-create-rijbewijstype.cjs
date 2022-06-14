'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rijbewijstypes', {
      rbtId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rbtNaam: {
          type: Sequelize.STRING(25),
          unique: true,
          allowNull: false
      },
      rbtOmschrijving: {
        type: Sequelize.STRING(50)
      }
    },
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rijbewijstypes');
  }
};