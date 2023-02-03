const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cost: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
});

module.exports = Order;
