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
      Coin.belongsTo(models.Wallet);

      Coin.hasMany(models.Transaction, {
        foreignKey: 'coinId',
        as: 'transactions',
        onDelete: 'CASCADE'
      });
    }
  }

  Coin.init({
    coin: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fullname: DataTypes.STRING,
    amount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Coin',
  });

  return Coin;
};