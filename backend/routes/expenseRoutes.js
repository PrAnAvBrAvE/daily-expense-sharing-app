const express = require('express');
const Expense = require('../models/expense');

const router = express.Router();

// Create Expense
router.post('/api/expenses', async (req, res) => {
    const { userId, amount, splitMethod, participants } = req.body;

    try {
        let calculatedParticipants = [];
        switch (splitMethod) {
            case 'equal':
                const numParticipants = participants.length;
                const splitAmountEqual = amount / numParticipants;
                calculatedParticipants = participants.map(participant => ({
                    userId: participant.userId,
                    amount: splitAmountEqual,
                }));
                break;

            case 'exact':
                const totalExactAmount = participants.reduce((total, participant) => total + participant.amount, 0);
                if (totalExactAmount > amount) {
                    return res.status(400).json({ message: 'Total amount for exact split exceeds the total expense amount' });
                }
                calculatedParticipants = participants.map(participant => ({
                    userId: participant.userId,
                    amount: participant.amount,
                }));
                break;

            case 'percentage':
                calculatedParticipants = participants.map(participant => {
                    const percentageAmount = (participant.percentage / 100) * amount;
                    return {
                        userId: participant.userId,
                        amount: percentageAmount,
                    };
                });
                break;

            default:
                return res.status(400).json({ message: 'Invalid split method' });
        }

        const newExpense = new Expense({ userId, amount, splitMethod, participants: calculatedParticipants });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: 'Error creating expense', error });
    }
});

// Fetch User Expenses
router.get('/api/expenses/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const expenses = await Expense.find({ userId }).populate('participants.userId');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
});

module.exports = router;
