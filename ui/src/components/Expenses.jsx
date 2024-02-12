import React, { useEffect, useState } from 'react';

const Expenses = ({expense}) => {
    const [expenses, setExpenses] = useState([]);

    const fetchExpenses = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/expenses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json(); // Extract JSON data from response
            console.log(data); // Log the data
            setExpenses(data); // Set the data to state
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, [expense]);

    console.log(expenses);

    return (
        <>
        <h2>Expenses</h2>
        <table>
            <thead>
                <tr>
                    <th>Name of the Expense</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
            {expenses.map((expense)=>{
           return <tr>
            <td>{expense.name}</td>
            <td>{expense.category}</td>
            <td>{expense.amount}</td>
            <td>{expense.location}</td>
           </tr>

        })}
            </tbody>
           </table>
        
        </>

    );
}

export default Expenses;
