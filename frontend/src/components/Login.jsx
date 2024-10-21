import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token); // Save token
            localStorage.setItem('userId', response.data.userId); // Save user ID
            navigate('/create-expense'); // Redirect to create-expense page
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                {/* Header */}
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Welcome Back!</h2>
                <p className="text-center text-gray-500 mb-4 text-sm">
                    Log in to track your expenses!
                </p>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? 
                        <Link to="/register" className="text-blue-600 hover:underline ml-1">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
