import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "./auth.css";

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; // Get email from navigation state
    const purpose = location.state?.purpose; // Get email from navigation state

    // Redirect to signup if no email in state
    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    // Function to handle OTP verification
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.put('http://localhost:5000/api/user/otp/verification', {
                otp
            });
            setSuccess("OTP verified successfully!");
            // Redirect to login after successful verification
            if (purpose === 'forgot-pass') {
                setTimeout(() => navigate('/reset-password', { state: { email, purpose: "forgot-pass" } }), 2000);
            }else{
            setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "OTP verification failed. Please try again.");
        }
    };

    // Function to handle OTP resend
    const handleResendOtp = async () => {
        setError('');
        setSuccess('');

        try {
            const response = await axios.put('http://localhost:5000/api/user/send/otp', {
                email
            });
            setSuccess("OTP resent successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
        }
    };

    return (
        <section className='auth-page-wrapper'>
            <div className="auth-card">
                <h1 className='auth-title'>Verify OTP</h1>
                <p className='auth-para'>
                    Enter the OTP sent to your email to verify your account.
                </p>

                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="number"
                        className='auth-input'
                        placeholder='Enter OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    
                    <button type="submit" className='auth-btn'>Verify</button>
                </form>
                <span className='dont-account mt-2' onClick={handleResendOtp}>
                    Resend OTP
                </span>
            </div>
        </section>
    );
};

export default VerifyOtp;
