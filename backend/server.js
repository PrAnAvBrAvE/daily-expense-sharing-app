const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(expenseRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/daily-expense-sharing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
