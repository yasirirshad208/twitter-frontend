import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Simple validation for password match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                name,
                email,
                phone,
                password,
                confirmPassword
            });

            setSuccess("Verification OTP sent to your email!");
            // Navigate to /verify-otp with email in the state
            setTimeout(() => navigate('/verify-otp', { state: { email }, purpose:"signup" }), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <section className='auth-page-wrapper'>
            <div className="auth-card">
                <h1 className='auth-title'>Account Signup</h1>
                <p className='auth-para'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae explicabo laboriosam consectetur ab fugit vero.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='auth-input'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className='auth-input'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        className='auth-input'
                        placeholder='Enter your phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                    <input
                        type="password"
                        className='auth-input'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    
                    <button type="submit" className='auth-btn'>Register Now</button>
                    <span className='dont-account' onClick={() => navigate('/login')}>
                        Already have an account? Login
                    </span>
                </form>
            </div>
        </section>
    );
};

export default Signup;
