const express = require('express');
const expensesRouter = require('./routes/expenses');
const bodyParser = require('body-parser');
const sequelize=require('./config/database');
const cors = require('cors');

require('dotenv').config(); 

const app = express();
app.use(cors({
  origin: ['http://localhost:5173'], // Replace with your frontend's origin and port
  credentials: true // Allow cookies when using with credentials (optional)
}));
app.use(bodyParser.json());

// Define routes for CRUD operations on expenses (replace with your routes code)

app.use('/api', expensesRouter);

// Synchronize the model with the database (create table if needed)
sequelize.sync()
  .then(() => {
    console.log('Models synchronized with database');
    // Start server after models are synced
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch(error => {
    console.error('Error synchronizing models:', error);
  });

  module.exports=app;


