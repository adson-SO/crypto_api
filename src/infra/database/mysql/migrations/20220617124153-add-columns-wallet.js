'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async t => {
        await queryInterface.addColumn('Wallets', 'email', {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        }, { transaction: t });

        await queryInterface.addColumn('Wallets', 'password', {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        }, { transaction: t });
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async t => {
        await queryInterface.removeColumn('Wallets', 'email', { transaction: t });

        await queryInterface.removeColumn('Wallets', 'password', { transaction: t });
    });
  }
};
