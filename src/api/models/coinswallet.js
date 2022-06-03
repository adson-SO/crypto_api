'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoinsWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Wallet.belongsToMany(models.Coin, { through: CoinsWallet });
      models.Coin.belongsToMany(models.Wallet, { through: CoinsWallet });
    }
  }

  CoinsWallet.init({
    walletAddress: {
      type: DataTypes.INTEGER,
      references: { model: 'wallets', key: 'address' }
    },
    coinId: {
      type: DataTypes.INTEGER,
      references: { model: 'coins', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'CoinsWallet',
  });

  return CoinsWallet;
};