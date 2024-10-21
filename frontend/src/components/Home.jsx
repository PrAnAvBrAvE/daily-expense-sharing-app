import React, { useEffect, useState } from 'react';
import { fetchUserExpenses } from '../api';

const Home = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const userId = localStorage.getItem('userId');
            const response = await fetchUserExpenses(userId);
            setExpenses(response.data);
        };
        fetchExpenses();
    }, []);

    return (
        <div>
            <h2>Your Expenses</h2>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense._id}>
                        <strong>Amount:</strong> {expense.amount} | <strong>Method:</strong> {expense.splitMethod}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
