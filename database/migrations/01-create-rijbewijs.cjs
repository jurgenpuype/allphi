'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rijbewijzen', {
      rijId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
        rijNummer: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING(50)
      },
        rijAfgifte: {
            allowNull: false,
            type: Sequelize.DATEONLY
      },
      rijGeldigheid: {
            type: Sequelize.DATEONLY
      }
    },
        {
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rijbewijzen');
  }
};