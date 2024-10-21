import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Your backend API URL

export const registerUser = (data) => axios.post(`${API_URL}/api/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/api/login`, data);
export const fetchUsers = () => axios.get(`${API_URL}/api/users`);
export const fetchUserExpenses = (userId) => axios.get(`${API_URL}/api/expenses/${userId}`);
export const addExpense = (data) => axios.post(`${API_URL}/api/expenses`, data);
