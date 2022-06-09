'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      coin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      walletAddress: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'wallets', key: 'address' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Coins');
  }
};