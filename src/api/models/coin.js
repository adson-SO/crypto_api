'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coin.belongsToMany(models.Wallet, { through: 'CoinsWallet' });
      
      Coin.hasMany(models.Transaction, {
        foreignKey: 'coinId',
        onDelete: 'CASCADE'
      });
    }
  }
  Coin.init({
    coin: DataTypes.STRING,
    fullname: DataTypes.STRING,
    amount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Coin',
  });
  return Coin;
};