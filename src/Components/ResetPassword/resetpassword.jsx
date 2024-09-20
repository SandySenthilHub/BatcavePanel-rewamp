import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './reset.css'
import { BASE_URL, RESET_PASSWORD } from '../../utils/ApplicationURL';
const ResetPassword = () => {

    const navigate = useNavigate();

    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleCPasswordVisibility = () => {
        setShowCPassword((prevShowCPassword) => !prevShowCPassword);
    };

    const handleSubmit = async (e) => {


        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            // const response = await fetch(`http://api.batcave.club/batcave/reset-password/${token}`, {
            const response = await fetch(`${BASE_URL}${RESET_PASSWORD}/${token}`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setMessage('Password reset successfully');
                navigate('/')
            } else {
                const data = await response.json();
                setMessage(data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Internal server error');
        }
    };

    return (
        <div className='resetContainer'>
            <div className='resetContent'>
                <div className='resetHeader'>
                    <h2>Reset Password</h2>

                </div>
                <form onSubmit={handleSubmit} className='resetForm'>
                    <div className="password-input">
                        {/* <label htmlFor="password"> New Password:</label> */}
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            id="password"
                            placeholder='New password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                    <div className="password-input">
                        {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
                        <input
                            type={showCPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="password-toggle-icon" onClick={toggleCPasswordVisibility}>
                            {showCPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>
                    <button type="submit" className='resetbtn'>Reset Password</button>
                </form>
                {message && <div>{message}</div>}
            </div>
        </div>
    );
};

export default ResetPassword;
