import React, { useState } from 'react';
import axios from 'axios';
import './membership.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Dashboard/Frame.svg'
import Profile from '../Dashboard/logoProfile.png'
import Arrow from '../Dashboard/chevron-down.svg'
import Pwd from '../Dashboard/pwd.svg';
import ph from '../Dashboard/ph_key.svg';
import Register1 from "../Register/Register"
import membership from './membership.svg';
import reg from './reg.svg';
import data from './data.svg'
import { BASE_URL, MEMBERSHIP_COST, SEND_OTP, VERIFY_OTP, CHANGE_PASSWORD } from '../../utils/ApplicationURL';

const MembershipCostForm = () => {
  const [membershipCost, setMembershipCost] = useState('');
  const [couponAmount, setCouponAmount] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Logged out !')
    toast.success('Logged out successfully');

    navigate('/');
  };

  const NavigateMSC = () => {

    navigate('/MemberShipCost');
  };
  const NavigateRegister = () => {

    navigate('/register');
  };
  const NavigateHome = () => {

    navigate('/dashboard');
  };
  const NavigateData = () => {

    navigate('/userdata');
  };

  const NavigateRegularData = () => {

    navigate('/regular-userdata');
  };

  const NavigateCostlessData = () => {

    navigate('/costless-userdata');
  };

  const NavigateRegData = () => {

    navigate('/registered-userdata');
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const openModal = () => {
    setShowModal(true);
    setShowDropdown(false); // Close the dropdown when modal opens
  };
  const closeModal = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

      const response = await axios.post(BASE_URL + CHANGE_PASSWORD, {

        currentPassword,
        newPassword,
        confirmPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Password change successful:', response.data.message);
      toast.success('Password changed successfully');
      // Close the modal after form submission
      closeModal();
    } catch (error) {
      console.error('Error changing password:', error.response.data.message);
      setError(error.response.data.message);
    }
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // If OTP is not sent, send OTP first
      if (!isOtpSent) {
        // const otpResponse = await axios.post('http://localhost:5000/api/send-otp', {
        const otpResponse = await axios.post(BASE_URL + SEND_OTP, {

          // phoneNumber: '+919342248343', 
          // phoneNumber: '+919087833685',

        });
        setIsOtpSent(true);
        setMessage('OTP sent. Please check your phone.');
      } else {
        // If OTP is sent, verify it
        // const verifyResponse = await axios.post('http://api.batcave.club/batcave/api/verify-otp', {
        const verifyResponse = await axios.post(BASE_URL + VERIFY_OTP, {

          otp,
        });
        if (verifyResponse.data.success) {
          // OTP verified, update membership cost
          // const updateResponse = await axios.post('http://api.batcave.club/batcave/api/membership-cost', {
          const updateResponse = await axios.post(BASE_URL + MEMBERSHIP_COST, {

            membershipCost,
            couponAmount,
          });
          setMessage(updateResponse.data.message);
          setIsOtpSent(false);
        } else {
          // Invalid OTP
          setMessage('Invalid OTP. Please try again.');
        }
      }
    } catch (error) {
      // Error occurred while verifying OTP
      console.error('Error:', error);
      if (error.response && error.response.status === 400) {
        // Invalid OTP
        setMessage('Invalid OTP. Please try again.');
      } else {
        // Other errors
        setMessage('Failed to verify OTP. Please try again.');
      }
    }
  };



  return (
    <div>

      <div className='header' onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <div className='logo'>
          <img src={logo} alt='' onClick={NavigateHome} />
        </div>
        <div className='profile'>
          <img className="profileimg" src={Profile} alt='' />
          <div>
            <div>Batcave</div>
            <div>super admin</div>

          </div>
          <img className="arrow" src={Arrow} alt='' height={4} width={6} />
          {showDropdown && (
            <div className='dropdown'>
              <div className='dropdownCon' onClick={NavigateRegister}>
                <img src={reg} alt='' />
                <span style={{ cursor: "pointer" }}>Register</span>
              </div>

              <div className='dropdownCon' onClick={NavigateData}>
                <img src={data} alt='' />
                <span style={{ cursor: "pointer" }}>OG users </span>
              </div>

              <div className='dropdownCon' onClick={NavigateRegularData}>
                <img src={data} alt='' />
                <span style={{ cursor: "pointer" }}>Xcelerators users </span>
              </div>

              {/* <div className='dropdownCon' onClick={NavigateCostlessData}>
                <img src={data} alt='' />
                <span style={{ cursor: "pointer" }}>Costless users </span>
              </div> */}

              <div className='dropdownCon' onClick={NavigateRegData} >
                <img src={data} alt='' />
                <span style={{ cursor: "pointer" }}>Ignition Insiders users</span>
              </div>

              <div className='dropdownCon' onClick={NavigateMSC}>
                <img src={membership} alt='' />
                <span style={{ cursor: "pointer" }}>Membership Cost</span>
              </div>

              <div className='dropdownCon' onClick={openModal}>
                <img src={Pwd} alt='' />
                <span style={{ cursor: "pointer" }}>Change Password</span>
              </div>

              <div className='dropdownCon' onClick={handleLogout}>
                <img src={ph} alt='' />
                <span style={{ cursor: "pointer" }}>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className='membership-container'>
        <div style={{ textAlign: "left" }}>
          <label htmlFor="membershipCost">Membership Amount</label> <br />
          <input
            type="number"
            id="membershipCost"
            value={membershipCost}
            onChange={(e) => setMembershipCost(e.target.value)}
          />
        </div>
        <div style={{ textAlign: "left" }}>
          <label htmlFor="couponAmount">Coupon Discount Amount</label><br />
          <input
            type="number"
            id="couponAmount"
            value={couponAmount}
            onChange={(e) => setCouponAmount(e.target.value)}
          />
        </div>
        {!isOtpSent && (
          <button type="submit">Send OTP</button>
        )}
        {isOtpSent && (
          <div >
            <label style={{ textAlign: "left" }} htmlFor="otp">Enter OTP</label><br />
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button style={{ marginTop: "20px" }} type="submit">Verify OTP</button>
          </div>
        )}
        {message && <p className='message'>{message}</p>}
      </form>

      {showModal && (
        <div className="modalOverlay">
          <div className="modal">
            <div className="modal-content center">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Change Password</h2>
              {error && <p className="error">{error}</p>}
              <form onSubmit={handleSubmit} className='changePW'>
                <label htmlFor="currentPassword">Current Password:</label><br />
                <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /><br />
                <label htmlFor="newPassword">New Password:</label><br />
                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br />
                <label htmlFor="confirmPassword">Confirm Password:</label><br />
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /><br /><br />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipCostForm;
