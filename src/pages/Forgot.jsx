import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.put('http://localhost:5000/api/user/send/otp', { email });
            setSuccess("OTP has been sent to your email.");
            
            // Navigate to OTP verification page with email in state
            setTimeout(() => navigate('/verify-otp', { state: { email, purpose: "forgot-pass" } }), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
        }
    };

    return (
        <section className='auth-page-wrapper'>
            <div className="auth-card">
                <h1 className='auth-title'>Forgot Password</h1>
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
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    
                    <button type="submit" className='auth-btn'>Forgot Password</button>
                    <span className='dont-account' onClick={() => navigate('/login')}>
                        Remember password? Login
                    </span>
                </form>
            </div>
        </section>
    );
};

export default Forgot;
