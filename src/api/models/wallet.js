'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wallet.hasMany(models.Coin, {
        foreignKey: 'walletAddress',
        as: 'coins',
        onDelete: 'CASCADE'
      });

      Wallet.hasMany(models.Transaction, {
        foreignKey: 'walletAddress',
        onDelete: 'CASCADE'
      });
    }
  }

  Wallet.init({
    address: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cpf: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    birthdate: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Wallet',
    defaultScope: {
      attributes: { exclude: ['password'] }
    }
  });
  
  return Wallet;
};