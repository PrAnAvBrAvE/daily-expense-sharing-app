import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api'; // Assumed API function

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, mobile, password });
            alert('Registration successful!');
            navigate('/create-expense'); // Redirect to create-expense page
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">
                    Create an account to track your expenses!
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Email Address"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Mobile Number"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white text-sm py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-center">
                    <p className="text-gray-500 text-sm">
                        Already have an account? 
                        <Link to="/" className="text-indigo-600 hover:underline ml-1">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
