'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('rijbewijstyperijbewijzen', {
            rtrId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            rtrRijbewijsId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'rijbewijzen',
                    key: 'rijId'
                },
                allowNull: false
            },
            rtrRijbewijsType: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'rijbewijstypes',
                    key: 'rbtId'
                },
                allowNull: false
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('rijbewijstyperijbewijzen');
    }
};