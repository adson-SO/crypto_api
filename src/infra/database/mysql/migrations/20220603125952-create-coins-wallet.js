'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CoinsWallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      walletAddress: {
        type: Sequelize.INTEGER,
        references: { model: 'wallets', key: 'address' }
      },
      coinId: {
        type: Sequelize.INTEGER,
        references: { model: 'coins', key: 'id' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CoinsWallets');
  }
};