import React, { useState } from 'react';
import axios from 'axios';
import '../Membership/membership.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Dashboard/Frame.svg'
import Profile from '../Dashboard/logoProfile.png'
import Arrow from '../Dashboard/chevron-down.svg'
import Pwd from '../Dashboard/pwd.svg';
import ph from '../Dashboard/ph_key.svg';
import Register1 from "../Register/Register"
import membership from '../Membership/membership.svg';
import reg from '../Membership/reg.svg';
import data from '../Membership/data.svg';
// import PollsModal from './viewPoll';
import { BASE_URL, MEMBERSHIP_COST, SEND_OTP, VERIFY_OTP, CHANGE_PASSWORD } from '../../utils/ApplicationURL';

const Phonepe = () => {
    const [membershipCost, setMembershipCost] = useState('');
    const [couponAmount, setCouponAmount] = useState('');
    //   const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showpollModal, setShowpollModal] = useState(false);

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

        navigate('/poll');
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

    const NavigateBFF = () => {

        navigate('/buy-car');
    };

    const openModal = () => {
        setShowModal(true);
        setShowDropdown(false); // Close the dropdown when modal opens
    };
    const closeModal = () => setShowModal(false);

    const [pollNumber, setpollNumber] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [message, setMessage] = useState('');


    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // const response = await axios.post('http://localhost:5000/api/polls', {
            const response = await axios.post(`${BASE_URL}/api/polls`, {

                pollNumber,
                question,
                options
            });
            setMessage('Poll created successfully!');
            setpollNumber('');
            setQuestion('');
            setOptions(['', '', '', '']);
        } catch (error) {
            console.error('Error creating poll:', error);
            setMessage('Failed to create poll.');
        }
    };



    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleAmountSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/customize/save`, {
            // const response = await axios.post(`http://localhost:5000/api/customize/save`, {


                amount,
                description,
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error saving payment details', error);
            setMessage('Failed to save payment details');
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

                            <div className='dropdownCon' onClick={NavigateBFF}>
                                <img src={membership} alt='' />
                                <span style={{ cursor: "pointer" }}>Car Request</span>
                            </div>

                            <div className='dropdownCon' onClick={NavigateMSC}>
                                <img src={membership} alt='' />
                                <span style={{ cursor: "pointer" }}>Poll Questions</span>
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

            <div className='membership-container'>
           

                <div>
                    <h2 style={{marginBottom:"50px"}}>Set Customized Payment Details</h2>
                    <form onSubmit={handleAmountSubmit}>
                        <div>
                            {/* <label>Amount:</label> */}
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                placeholder='Amount'
                            />
                        </div>
                        <div>
                            {/* <label>Description:</label> */}
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder='Description'
                                style={{marginTop:"40px", marginBottom:"50px"}}
                            />
                        </div>
                        <button className='viewPoll' type="submit">Save</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>


            </div>

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

export default Phonepe;
