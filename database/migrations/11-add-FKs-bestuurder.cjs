'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                /* qI.command(options, {transaction: t}), */
                queryInterface.addColumn('bestuurders', 'besRijbewijs',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'rijbewijzen',
                            key: 'rijId'
                        },
                        unique: true,
                        allowNull: false
                    },
                    { transaction: t }),
                queryInterface.addColumn('bestuurders', 'besVoertuig',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'voertuigen',
                            key: 'voeId'
                        },
                        unique: true
                    },
                    { transaction: t }),
                queryInterface.addColumn('bestuurders', 'besTankkaart',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'tankkaarten',
                            key: 'tanId'
                        },
                        unique: true
                    },
                    { transaction: t }),
            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                /* qI.command(options, {transaction: t}), */
                queryInterface.removeColumn('bestuurders', 'besRijbewijs', { transaction: t }),
                queryInterface.removeColumn('bestuurders', 'besVoertuig', { transaction: t }),
                queryInterface.removeColumn('bestuurders', 'besTankkaart', { transaction: t })
            ]);
        });
    }
};