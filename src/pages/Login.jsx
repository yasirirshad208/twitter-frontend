import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error message

        try {
            const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
            // Assuming the response contains a token or user info
            const { token, user } = response.data;
            // Store the token or handle it as needed
            localStorage.setItem('token', token);
            // Redirect or handle success
            navigate('/'); // Replace with the intended path after login
        } catch (err) {

            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';

            if (errorMessage.toLowerCase().includes("otp")) {
                // Redirect to verify OTP page if "otp" is part of the error message
                setError(errorMessage);
                navigate('/verify-otp', { state: { email } }, 2000);
            } else {
                setError(errorMessage);
            }
        }
    };

    return (
        <section className='auth-page-wrapper'>
            <div className="auth-card">
                <h1 className='auth-title'>Account Login</h1>
                <p className='auth-para'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae explicabo laboriosam consectetur ab fugit vero.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className='auth-input'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className='auth-input'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <div className='forgot-password-link' onClick={() => navigate('/forgot-password')}>
                        <span>Forgot Password?</span>
                    </div>
                    <button type="submit" className='auth-btn'>Login Now</button>
                    <span className='dont-account' onClick={() => navigate('/signup')}>Don't have an account? Sign Up</span>
                </form>
            </div>
        </section>
    );
};

export default Login;
