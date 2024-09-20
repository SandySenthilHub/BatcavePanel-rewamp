import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../ForgotPassword/forgot';
import './login.css';
import logo from './logo.svg';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { BASE_URL, LOGIN } from '../../utils/ApplicationURL';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(BASE_URL + LOGIN, { email, password });
      // const response = await axios.post('http://localhost:5000/login', { email, password });

      console.log(response.data);

      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);

      // Conditional navigation based on email
      if (email === 'barathi@invicious.in') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password');
    }
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <div className='Container'>
      <div className='centeredContent'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>

        <div className='loginContainer'>
          <div className='loginHeader'>
            <div>LOGIN</div>
            <div>Enter valid credentials to login to portal</div>
          </div>

          <div className='loginForm'>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='EMAIL ID'
              /> <br />
              <div className="password-input">
                <input
                  type={showPassword}
                  value={password}
                  id="Password"
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='PASSWORD'
                />
                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              {error && <div className="error-message">{error}</div>}
              <div
                onClick={handleForgotPasswordClick}
                className='forgotpwd' style={{ cursor: "pointer" }}>
                Forgot password?
              </div>
              <button type="submit" className='loginbtn' style={{ cursor: "pointer" }}>LOGIN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
