'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                /* qI.command(options, {transaction: t}), */
                queryInterface.addColumn('voertuigen', 'voeRijbewijs',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'rijbewijstypes',
                            key: 'rbtId'
                        },
                        allowNull: false
                    },{ transaction: t })
            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                /* qI.command(options, {transaction: t}), */
                queryInterface.removeColumn('voertuigen', 'voeRijbewijs', { transaction: t })
            ]);
        });
    }
};