'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tankkaartbrandstoffen', {
            tabrId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tabrTankkaartId: {
                references: {
                    model: 'tankkaarten',
                    key: 'tanId'
                },
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tabrBrandstofType: {
                references: {
                    model: 'brandstoffen',
                    key: 'bravId'
                },
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tankkaartbrandstoffen');
    }
};