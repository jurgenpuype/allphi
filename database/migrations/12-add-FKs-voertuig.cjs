'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                /* qI.command(options, {transaction: t}), */
                queryInterface.addColumn('voertuigen', 'voeBrandstoftype',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'brandstoffen',
                            key: 'bravId'
                        },
                        allowNull: false
                    },
                    { transaction: t }),
                queryInterface.addColumn('voertuigen', 'voeVoertuigtype',
                    {
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'voertuigtypes',
                            key: 'voetId'
                        },
                        allowNull: false
                    },
                    { transaction: t }),
            ]);
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                /* qI.command(options, {transaction: t}), */
                queryInterface.removeColumn('voertuigen', 'voeBrandstoftype', { transaction: t }),
                queryInterface.removeColumn('voertuigen', 'voeVoertuigtype', { transaction: t })
            ]);
        });
    }
};