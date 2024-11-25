import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "./auth.css";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Get email from navigation state

    // Redirect to forgot page if no email in state
    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    // Function to handle password reset
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Simple validation for password match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.put('http://localhost:5000/api/user/password/reset', {
                email,
                password,
                confirmPassword
            });
            setSuccess("Password reset successfully!");
            // Redirect to login after successful reset
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Password reset failed. Please try again.");
        }
    };

    return (
        <section className='auth-page-wrapper'>
            <div className="auth-card">
                <h1 className='auth-title'>Reset Password</h1>
                <p className='auth-para'>
                    Enter your new password below to reset it.
                </p>

                <form onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        className='auth-input'
                        placeholder='Enter new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className='auth-input'
                        placeholder='Confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    
                    <button type="submit" className='auth-btn'>Reset Password</button>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;
