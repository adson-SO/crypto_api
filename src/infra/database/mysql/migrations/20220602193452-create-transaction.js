'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.DOUBLE
      },
      datetime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sendTo: {
        type: Sequelize.INTEGER
      },
      receiveFrom: {
        type: Sequelize.INTEGER
      },
      currentCotation: {
        type: Sequelize.DOUBLE
      },
      coinId: {
        type: Sequelize.INTEGER,
        references: { model: 'coins', key: 'id' },
        onDelete: 'CASCADE'
      },
      walletAddress: {
        type: Sequelize.INTEGER,
        references: { model: 'wallets', key: 'address' },
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};