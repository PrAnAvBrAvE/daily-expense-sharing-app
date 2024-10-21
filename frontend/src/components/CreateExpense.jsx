import React, { useState, useEffect } from 'react';
import { addExpense, fetchUsers } from '../api';
import { useNavigate } from 'react-router-dom';

const CreateExpense = () => {
    const [amount, setAmount] = useState('');
    const [splitMethod, setSplitMethod] = useState('equal');
    const [participants, setParticipants] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [participantAmounts, setParticipantAmounts] = useState({});
    const [addedParticipants, setAddedParticipants] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetchUsers();
            setAllUsers(response.data);
        };
        fetchAllUsers();
    }, []);

    const handleAddParticipant = (userId) => {
        setParticipants([...participants, { userId }]);
        setAddedParticipants({ ...addedParticipants, [userId]: true });
    };

    const handleAmountChange = (userId, value) => {
        setParticipantAmounts({
            ...participantAmounts,
            [userId]: value,
        });
    };

    const handlePercentageChange = (userId, value) => {
        setParticipantAmounts({
            ...participantAmounts,
            [userId]: { percentage: value },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('userId');
            let splitParticipants;

            if (splitMethod === 'exact') {
                splitParticipants = participants.map((participant) => ({
                    userId: participant.userId,
                    amount: participantAmounts[participant.userId],
                }));
            } else if (splitMethod === 'percentage') {
                splitParticipants = participants.map((participant) => ({
                    userId: participant.userId,
                    percentage: participantAmounts[participant.userId].percentage,
                }));
            } else {
                splitParticipants = participants;
            }

            await addExpense({ userId, amount, splitMethod, participants: splitParticipants });
            alert('Expense added successfully!');
        } catch (error) {
            alert('Failed to add expense.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 relative">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">Create a New Expense</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Total Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter total amount"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Split Method</label>
                    <select
                        value={splitMethod}
                        onChange={(e) => setSplitMethod(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        <option value="equal">Split Equally</option>
                        <option value="exact">Split by Exact Amount</option>
                        <option value="percentage">Split by Percentage</option>
                    </select>
                </div>

                {allUsers.map((user) => (
                    <div key={user._id} className="flex justify-between items-center mb-4">
                        <label className="text-gray-700">{user.name}</label>
                        {splitMethod === 'exact' && (
                            <input
                                type="number"
                                placeholder="Amount"
                                onChange={(e) => handleAmountChange(user._id, e.target.value)}
                                className="border px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                        )}
                        {splitMethod === 'percentage' && (
                            <input
                                type="number"
                                placeholder="Percentage"
                                onChange={(e) => handlePercentageChange(user._id, e.target.value)}
                                className="border px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                        )}
                        {splitMethod === 'equal' && (
                            <button
                                type="button"
                                onClick={() => handleAddParticipant(user._id)}
                                className={`px-3 py-1 text-white rounded-lg transition duration-300 ${
                                    addedParticipants[user._id] ? 'bg-green-500' : 'bg-indigo-500 hover:bg-indigo-600'
                                }`}
                            >
                                {addedParticipants[user._id] ? 'Added' : 'Add'}
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="mt-6 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Add Expense
                </button>
            </form>

            {/* Logout button */}
            <button
                onClick={handleLogout}
                className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default CreateExpense;
