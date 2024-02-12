import React, { useCallback, useState } from 'react';
import Expenses from './Expenses';

const Home = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'name':
        setName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      case 'location':
        setLocation(value);
        break;
      default:
        break;
    }
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    console.log("data",name,amount,category,location)
    // Validate inputs here
    if (!name || !category || !amount || !location) {
      // Display error message to user
      return;
    }

    // Send data to API or perform other actions
    try {
      const response = await fetch(`http://localhost:3000/api/add-expense`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({ name, category, amount, location }),
      });

      if (response.ok) {
        // Clear form fields
        setName('');
        setCategory('');
        setAmount('');
        setLocation('');

        // Show success message to user
      } else {
        // Handle API error
      console.log("api error",response)

      }
    } catch (error) {
      // Handle general errors
      console.log("general error",error)
    }
  };

  return (
    <section className='home flex'>
      <form className='expense-form flex' onSubmit={handleAddExpense}>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='name'
          placeholder='Name of the Expense'
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor='category'>Category:</label>
        <input
          type='text'
          id='category'
          placeholder='Category'
          value={category}
          onChange={handleInputChange}
        />
        <label htmlFor='price'>Price:</label>
        <input
          type='number'
          id='amount'
          placeholder='Amount'
          value={amount}
          onChange={handleInputChange}
        />
        <label htmlFor='location'>Location:</label>
        <input
          type='text'
          id='location'
          placeholder='Location'
          value={location}
          onChange={handleInputChange}
        />
        <button type='submit'>Add Expense</button>
      </form>
      <Expenses expense={{name,category,amount,location}}/>
    </section>
  );
};

export default Home;
