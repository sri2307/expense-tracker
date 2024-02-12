// models/expense.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
  name: Sequelize.STRING,
  category: Sequelize.STRING,
  amount: Sequelize.DECIMAL,
  location: Sequelize.STRING,
  date: Sequelize.DATEONLY,
});

module.exports = Expense;
