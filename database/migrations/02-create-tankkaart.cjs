'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tankkaarten', {
      tanId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanKaartnummer: {
          type: Sequelize.STRING,
          allowNull: false
      },
        tanGeldigheidsdatum: {
            allowNull: false,
            type: Sequelize.DATEONLY
      },
      tanPincode: {
            type: Sequelize.STRING(10)
      },
        tanGeblokkeerd: {
            allowNull: false,
            defaultValue: 0,
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
    await queryInterface.dropTable('tankkaarten');
  }
};