import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Membership/membership.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Dashboard/Frame.svg';
import Profile from '../Dashboard/logoProfile.png';
import Arrow from '../Dashboard/chevron-down.svg';
import Pwd from '../Dashboard/pwd.svg';
import ph from '../Dashboard/ph_key.svg';
import membership from '../Membership/membership.svg';
import reg from '../Membership/reg.svg';
import data from '../Membership/data.svg';
import { BASE_URL } from '../../utils/ApplicationURL'; // Adjust your import as per your project structure

const PhonepePaymentDetails = () => {
    const [error, setError] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [userData, setUserData] = useState({
        userName: '',
        phone: '',
        amount: '',
        description: ''
    });

    const [links, setLinks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetchLinks();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/');
    };

    const openModal = () => setShowModal(true);

    const closeModal = () => setShowModal(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${BASE_URL}/change-password`, {
                currentPassword,
                newPassword,
                confirmPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success('Password changed successfully');
            closeModal();
        } catch (error) {
            console.error('Error changing password:', error.response.data.message);
            setError(error.response.data.message);
        }
    };

    const fetchLinks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/payment-links`);
            const linksData = response.data;
            localStorage.setItem('paymentLinks', JSON.stringify(linksData)); // Store links in localStorage
            setLinks(linksData);
        } catch (error) {
            console.error('Error fetching payment links:', error);
            toast.error('Failed to fetch payment links');
        }
    };

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handlePaySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/generate-link`, userData);
            toast.success('Payment link generated successfully');
            setLinks([...links, response.data]); // Add the new link to the state
            setUserData({ userName: '', phone: '', amount: '', description: '' });
        } catch (error) {
            console.error('Error generating payment link:', error);
        }
    };

    const copyToClipboard = async (link) => {
        try {
            await navigator.clipboard.writeText(link);
            toast.success('Link copied to clipboard');
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            toast.error('Failed to copy link to clipboard');
        }
    };

    const viewAllLinks = () => {
        navigate('/payment-links');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
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

    const NavigateBFF = () => {
        navigate('/buy-car');
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
                            <div className='dropdownCon' onClick={NavigateRegData}>
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
                    <h2>All Generated Links</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Phone</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Expiry Date</th>
                                <th>Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map((link) => (
                                <tr key={link._id}>
                                    <td>{link.userName}</td>
                                    <td>{link.phone}</td>
                                    <td>{link.amount}</td>
                                    <td>{link.description}</td>
                                    <td>{link.amountPaid ? 'Paid' : 'Not Paid'}</td>
                                    <td>{new Date(link.expiryTime).toLocaleString()}</td>
                                    <td><a href={link.link} target="_blank" rel="noopener noreferrer">Link</a></td>
                                    <td><button onClick={() => copyToClipboard(link.link)}>Copy Link</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                <button type="submit">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhonepePaymentDetails;
