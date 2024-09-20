import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../Components/Dashboard/dashboard.css';
import logo from '../Components/Dashboard/Frame.svg'
import Profile from '../Components/Dashboard/logoProfile.png'
import Arrow from '../Components/Dashboard/chevron-down.svg'
import Pwd from '../Components/Dashboard/pwd.svg';
import ph from '../Components/Dashboard/ph_key.svg';
import membership from '../Components/Dashboard/membership.svg'
import reg from '../Components/Dashboard/reg.svg';
import data from '../Components/Dashboard/data.svg'

import AdminCountdown from './Countdown';
import { BASE_URL , CHANGE_PASSWORD} from '../utils/ApplicationURL';
// import { BASE_URL, CHANGE_PASSWORD } from '../../utils/ApplicationURL';


const AdminDashboard = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log('Logged out !')
        toast.success('Logged out successfully');
        localStorage.removeItem('email')

        navigate('/');
    };

    const NavigateMSC = () => {

        navigate('/MemberShipCost');
    };

    const NavigateRegister = () => {

        navigate('/register');
    };


    const NavigateData = () => {
        navigate('/userdata');
    };

    const newNavigateData = () => {

        navigate('/register-OGuserdata');
    };

    const NavigateRegularData = () => {

        navigate('/regular-userdata');
    };

    const NavigateCostlessData = () => {

        navigate('/costless-userdata');
    };

    const NavigateRegData = () => {

        navigate('/registered-users');
    };


    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const openModal = () => {
        setShowModal(true);
        setShowDropdown(false);
    };
    const closeModal = () => setShowModal(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

            // const response = await axios.post('http://api.batcave.club/batcave/change-password', {
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


    return (
        <>
            <div>
                <div className='Container'>

                    <div className='header' onClick={toggleDropdown} style={{ cursor: "pointer" }} >
                        <div className='logo'>
                            <img src={logo} alt='' />
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

                                    {/* <div className='dropdownCon' onClick={NavigateRegister} >
                                        <img src={reg} alt='' />
                                        <span style={{ cursor: "pointer" }}>Register</span>
                                    </div> */}

                                    {/* <div className='dropdownCon' onClick={NavigateData}>
                                        <img src={data} alt='' />
                                        <span style={{ cursor: "pointer" }}>OG users </span>
                                    </div> */}

                                    {/* <div className='dropdownCon' onClick={newNavigateData}>
                                        <img src={data} alt='' />
                                        <span style={{ cursor: "pointer" }}>New OG users </span>
                                    </div> */}

                                    {/* <div className='dropdownCon' onClick={NavigateRegularData}>
                                        <img src={data} alt='' />
                                        <span style={{ cursor: "pointer" }}>Xcelerators users </span>
                                    </div> */}

                                    {/* <div className='dropdownCon' onClick={NavigateCostlessData}>
                                        <img src={data} alt='' />
                                        <span style={{ cursor: "pointer" }}>Costless users </span>
                                    </div> */}

                                    <div className='dropdownCon' onClick={NavigateRegData} >
                                        <img src={data} alt='' />
                                        <span style={{ cursor: "pointer" }}>Registered Users </span>
                                    </div>

                                    {/* <div className='dropdownCon' onClick={NavigateMSC}>
                                        <img src={membership} alt='' />
                                        <span style={{ cursor: "pointer" }}>Membership Cost</span>
                                    </div> */}

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

                    <div className='bdy'>
                        <div className="dashboardCountdown">
                            <AdminCountdown />
                        </div>


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

        </>


    )
}

export default AdminDashboard;
