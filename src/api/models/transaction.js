'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Coin);

      Transaction.belongsTo(models.Wallet);
    }
  }

  Transaction.init({
    value: DataTypes.DOUBLE,
    datetime: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    sendTo: DataTypes.INTEGER,
    receiveFrom: DataTypes.INTEGER,
    currentCotation: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Transaction',
    timestamps: false
  });

  return Transaction;
};