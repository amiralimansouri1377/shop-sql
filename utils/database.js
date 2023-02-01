const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shop', 'root', 'Amirali#1377', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
