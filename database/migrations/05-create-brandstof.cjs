'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('brandstoffen', {
      bravId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bravNaam: {
          type: Sequelize.STRING(25),
          unique: true,
          allowNull: false
      },
      bravOmschrijving: {
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
    await queryInterface.dropTable('brandstoffen');
  }
};