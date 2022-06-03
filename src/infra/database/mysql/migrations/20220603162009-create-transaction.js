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
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      datetime: {
        type: Sequelize.DATE,
        default: new Date() 
      },
      sendTo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      receiveFrom: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currentCotation: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      walletAddress: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'wallets', key: 'address' }
      },
      coinId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'coins', key: 'id' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};