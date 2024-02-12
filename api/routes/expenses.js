const express = require('express');
const expenseModel = require('../models/expense'); 
const Sequelize = require('sequelize');
require('dotenv').config(); 

const router = express.Router();

const { check, validationResult } = require('express-validator'); // For validation

// Route for adding expenses
router.post('/add-expense',
  [
    // Validation rules for request body
    check('name').notEmpty().withMessage('Expense name is required'),
    check('category').notEmpty().withMessage('Expense category is required'),
    check('amount').isNumeric().withMessage('Expense amount must be a number'),
    check('location').optional(),
    check('date').isDate().optional(),
  ],
  async (req, res) => {
    // Handle validation errors
    console.log("body",req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Access validated data from request body
    const { name, category, amount, location, date } = req.body;

    try {
      // Create a new expense instance
   
      const newExpense = await expenseModel.create({
        name,
        category,
        amount,
        location,
        date,
      });

      // Send successful response with created expense
      res.status(201).json(newExpense);
    } catch (error) {
      // Handle errors during expense creation
      console.error('Error creating expense:', error);
      res.status(500).json({ message: 'Error creating expense' });
    }
  }
);

router.get('/expenses',async (req, res) => {
    try {
      const expenses = await expenseModel.findAll(); 
  
      // Optional: Filter or sort expenses based on query parameters
      const { category, dateFrom, dateTo } = req.query; // Extract query params
      if (category) {
        expenses = expenses.filter(expense => expense.category === category);
      }
      if (dateFrom && dateTo) {
        expenses = expenses.filter(expense => new Date(expense.date) >= dateFrom && new Date(expense.date) <= dateTo);
      }
  
      res.status(200).json(expenses);
    } catch (error) {
      console.error('Error retrieving expenses:', error);
      res.status(500).json({ message: 'Error retrieving expenses' });
    }
  })

module.exports = router;
