import React, { useState } from 'react';
import axios from 'axios';
import './forgot.css'
import { BASE_URL, FORGOT_PASSWORD } from '../../utils/ApplicationURL';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://api.batcave.club/batcave/forgot-password', { email });
      const response = await axios.post(BASE_URL + FORGOT_PASSWORD, { email });

      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div className='forgotPW'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div style={{textAlign:"center"}}>
          {/* <label htmlFor="email">Email:</label>  */}
          <input
            type="email"
            placeholder='Email'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          
          />
        </div>
        <button type="submit" style={{cursor:"pointer"}}>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
