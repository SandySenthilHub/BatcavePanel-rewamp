import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './userProfile.css';
import Edit from './Frame(11).svg';
import { BASE_URL, RAZORPAY_USERS, SEND_EMAIL_COST, UPDATE_MCOST, UPDATE_POINTS, VERIFY_MCOST, VERIFY_POINTS } from '../../utils/ApplicationURL';

const UserDetailsPage = ({ userId }) => {
  const { user_id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [pointsChange, setPointsChange] = useState(null);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [showModalMC, setShowModalMC] = useState(false);
  const [submitAttemptedMC, setSubmitAttemptedMC] = useState(false);
  const [otpMC, setOtpMC] = useState('');
  const [errorMC, setErrorMC] = useState('');
  const [newMembershipCost, setNewMembershipCost] = useState('');

  

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${RAZORPAY_USERS}/${user_id}`);
        // const response = await axios.get(`http://localhost:5000${RAZORPAY_USERS}/${user_id}`);

        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [user_id]);

  const handleEditClick = () => {
    setShowModal(true);
    setPointsChange(0);
    setSubmitAttempted(false);
    setOtp('');
    setError('');
  };



  const handleCloseModal = () => {
    setShowModal(false);
    setPointsChange(0);
    setSubmitAttempted(false);
    setOtp('');
    setError('');
  };

  const handleDecrementPoints = () => {
    setPointsChange(Math.max(pointsChange - 1));
  };

  const handleIncrementPoints = () => {
    setPointsChange(pointsChange + 1);
  };

  const loggedInEmail = localStorage.getItem('email')

  const handleSendOtp = async () => {
    try {
      const response = await axios.put(`${BASE_URL}${RAZORPAY_USERS}${user_id}${UPDATE_POINTS}`, { pointsToAdd: pointsChange, email:loggedInEmail });

      // const response = await axios.put(`http://localhost:5000${RAZORPAY_USERS}/${user_id}${UPDATE_POINTS}`, { pointsToAdd: pointsChange, email: loggedInEmail });
      setSubmitAttempted(true);
      setError('');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.put(`${BASE_URL}${RAZORPAY_USERS}${user_id}${VERIFY_POINTS}`, { otp, pointsToAdd: pointsChange });
      // const response = await axios.put(`http://localhost:5000${RAZORPAY_USERS}/${user_id}${VERIFY_POINTS}`, { otp: otp, pointsToAdd: pointsChange });

      setError('');
      setUserDetails({ ...userDetails, points: userDetails.points + pointsChange });
      handleCloseModal();
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleSendOtpMC = async () => {
    try {

      // const response = await axios.put(`${BASE_URL}${RAZORPAY_USERS}${user_id}${UPDATE_MCOST}`, { pointsToAdd: pointsChange, email:loggedInEmail });

      // const response = await axios.put(`http://localhost:5000${RAZORPAY_USERS}/${user_id}${UPDATE_MCOST}`, {
      const response = await axios.put(`${BASE_URL}${RAZORPAY_USERS}/${user_id}${UPDATE_MCOST}`, {

        newMembershipCost: parseFloat(newMembershipCost),
        email: loggedInEmail
      });
      setSubmitAttemptedMC(true);
      setErrorMC('');
    } catch (error) {
      setErrorMC('Failed to send OTP. Please try again.');
    }
  };



  const handleOtpSubmitMC = async () => {
    try {
      // const response = await axios.put(`http://localhost:5000${RAZORPAY_USERS}/${user_id}${VERIFY_MCOST}`, {
      const response = await axios.put(`${BASE_URL}${RAZORPAY_USERS}/${user_id}${VERIFY_MCOST}`, {

        otpMC: otpMC,
        newMembershipCost: parseFloat(newMembershipCost)
      });
  
      if (response.status === 200) {
        // Update userDetails with the new membership cost
        const updatedMembershipCost = parseFloat(newMembershipCost);
        setUserDetails(prevUserDetails => ({
          ...prevUserDetails,
          membershipCost: updatedMembershipCost
        }));
  
        console.log('Updated membership cost:', updatedMembershipCost);
  
        // Call sendEmail after updating userDetails
        await sendEmail(updatedMembershipCost); // Pass updatedMembershipCost to sendEmail
        handleCloseModalMC();
      } else {
        setErrorMC('Failed to update membership cost. Please try again.');
      }
    } catch (error) {
      setErrorMC('Invalid OTP. Please try again.');
    }
  };
  
  const sendEmail = async (updatedMembershipCost) => {
    const { name, email, phone, dob, address, city, pincode, invoiceDate, user_id , membershipCost} = userDetails;
  
    console.log('Membership cost in sendEmail:', updatedMembershipCost);
  
    try {
      if (email && user_id && name) {
        // const response = await axios.post(`http://localhost:5000${SEND_EMAIL_COST}`, {
        const response = await axios.post(`${BASE_URL}${SEND_EMAIL_COST}`, {

          email,
          user_id,
          name,
          dob,
          city,
          pincode,
          state: 'Tamil Nadu',
          grandTotal: updatedMembershipCost, 
          prvMCost:membershipCost,
          address1: address,
          phone,
          invoiceDate
        });
  
        if (response.status === 200) {
          console.log('Email sent successfully');
          setMessage('Email sent successfully');
        } else {
          console.log('Failed to send email');
          setMessage('Failed to send email');
        }
      } else {
        setMessage('Required data not found in local storage');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to send email');
    }
  };


  const handleDownloadInvoice = async () => {
    try {
      // const response = await axios.get(`http://localhost:5000/download-invoice/${userId}`, {
      const response = await axios.get(`http://localhost:5000/download-invoice/BCOG00004`, {

        responseType: 'blob', // Receive response as blob (binary data)
      });

      // Trigger file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading invoice:', error);
      // Handle error (e.g., display error message)
    }
  };

  const handleEditClickMC = () => {
    setShowModalMC(true);
    setSubmitAttemptedMC(false);
    setOtpMC('');
    setErrorMC('');
  };

  const handleCloseModalMC = () => {
    setShowModalMC(false);
    setSubmitAttemptedMC(false);
    setOtpMC('');
    setErrorMC('');
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const phone = userDetails.phone;
  const email = userDetails.email;

  return (
    <div className='profileContainer'>
      <div className='leftProfile'>
        <div className='Profilename'>Hello {userDetails.name},</div>
        <div className="profileField">
          <span>Unique ID</span>
          <span className='end'>{userDetails.user_id}</span>
        </div>
        <div className="profileField">
          <span>Email ID</span>
          <span style={{ textTransform: "lowercase" }}>{email}</span>
        </div>
        <div className="profileField">
          <span>Mobile Number</span>
          <span>{phone}</span>
        </div>
        <div className="profileField">
          <span>City</span>
          <span>{userDetails.city}</span>
        </div>
        <div className="profileField">
          <span>Points Earned</span>
          <span>
            {userDetails.points}
            <img src={Edit} onClick={handleEditClick} alt="Edit Points" />
          </span>
        </div>
        <div className="profileField">
          <span>Points Spent</span>
          <span>NIL</span>
        </div>
        <div className="profileField">
          <span>Membership Cost</span>
          <span>

            {userDetails.membershipCost}
            {userDetails.membershipCost < 5000 && (
              <img src={Edit} alt="Edit Membership Cost" onClick={handleEditClickMC} style={{cursor:"pointer"}} />
            )}
          </span>
        </div>

        <div className="profileField">
          <span>Invoice</span>
          <span>

            <button className='invoicebtn' onClick={handleDownloadInvoice}>Download</button>
          </span>
        </div>

      </div>

      {/* for points update */}
      {showModal && (
        <div className="modalOverlay" style={{ color: "black" }}>

          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h2 style={{ marginBottom: "10px" }}>Update Points</h2>
              <p>Current Points: {userDetails.points}</p>
              <div>
                <button className='pointsBtn1' onClick={handleDecrementPoints}>-</button>
                <input
                  type="number"
                  value={pointsChange}
                  onChange={(e) => setPointsChange(parseInt(e.target.value) || null)}
                  style={{ width: '50px', textAlign: 'center', margin: '0 10px', background: "none", border: "1px solid #1AABFF", outline: "none", borderRadius: "2px" }}
                />
                <button className='pointsBtn1' onClick={handleIncrementPoints}>+</button>
              </div>
              {!submitAttempted && (
                <button style={{ marginTop: "20px" }} className='pointsBtn' onClick={handleSendOtp}>Send OTP</button>
              )}
              {submitAttempted && (
                <>
                  <input
                    type="text"
                    placeholder="ENTER OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ textAlign: 'center', margin: '30px 10px', background: "none", borderBottom: "1px solid #1AABFF", outline: "none", border: "none", letterSpacing: "10px" }}

                  /><br />
                  <button className='pointsBtn' onClick={handleOtpSubmit}>Submit OTP</button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showModalMC && (
        <div className="modalOverlay" style={{ color: "black" }}>

          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModalMC}>&times;</span>
              <h2 style={{ marginBottom: "10px" }}>Update Membership Cost</h2>
              <div>
                <input
                  type="text"
                  placeholder="New Membership Cost"
                  value={newMembershipCost}
                  onChange={(e) => setNewMembershipCost(e.target.value)}
                  style={{ width: '200px', textAlign: 'center', margin: '10px 0', padding: '5px', border: '1px solid #1AABFF', borderRadius: '4px', outline: "none" }}
                />
              </div>
              {!submitAttemptedMC && (
                <button style={{ marginTop: "20px" }} className='pointsBtn' onClick={handleSendOtpMC}>Send OTP</button>
              )}
              {submitAttemptedMC && (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otpMC}
                    maxLength={6}
                    onChange={(e) => setOtpMC(e.target.value)}
                    style={{ textAlign: 'center', margin: '30px 0', padding: '5px', borderBottom: '1px solid #1AABFF', borderRadius: '4px', border: "none", outline: "none",letterSpacing: "10px"  }}
                  /> <br />
                  <button className='pointsBtn' onClick={handleOtpSubmitMC}>Submit OTP</button>
                  {errorMC && <p style={{ color: 'red', marginTop: '10px' }}>{errorMC}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;














// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './userProfile.css';
// import Edit from './Frame(11).svg';
// import { BASE_URL, RAZORPAY_USERS } from '../../utils/ApplicationURL';

// const UserDetailsPage = () => {
//   const { user_id } = useParams();
//   const [userDetails, setUserDetails] = useState(null);
//   const [showModal, setShowModal] = useState(false);


//   const [pointsChange, setPointsChange] = useState(0);
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [submitAttempted, setSubmitAttempted] = useState(false);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}${RAZORPAY_USERS}/${user_id}`);
//         setUserDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUserDetails();
//   }, [user_id]);

//   const handleEditClick = () => {
//     setShowModal(true);
//     setPointsChange(0);
//     setSubmitAttempted(false);
//     setOtp('');
//     setError('');
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setPointsChange(0);
//     setSubmitAttempted(false);
//     setOtp('');
//     setError('');
//   };

//   const handleDecrementPoints = () => {
//     setPointsChange(Math.max(pointsChange - 1, 0)); // Ensure pointsChange doesn't go below 0
//   };

//   const handleIncrementPoints = () => {
//     setPointsChange(pointsChange + 1);
//   };

//   const handlePointsSubmit = () => {
//     setShowModal(true);
//   };

//   const handleSendOtp = () => {
//     setSubmitAttempted(true);
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleOtpSubmit = async () => {
//     try {
//       const response = await axios.post(`${BASE_URL}/verify-otp`, { otp }); // Assuming this endpoint verifies OTP
//       if (response.data && response.data.success) {
//         // OTP verification successful, update points
//         setUserDetails((prevUserDetails) => ({
//           ...prevUserDetails,
//           points: prevUserDetails.points + pointsChange
//         }));
//         handleCloseModal();
//       } else {
//         setError('Invalid OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       setError('Error verifying OTP. Please try again.');
//     }
//   };

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }

//   const phone = userDetails.phone;
//   const email = userDetails.email;

//   return (
//     <div className='profileContainer'>
//       <div className='leftProfile'>
//         <div className='Profilename'>Hello {userDetails.name},</div>
//         <div className="profileField">
//           <span>Unique ID</span>
//           <span className='end'>{userDetails.user_id}</span>
//         </div>
//         <div className="profileField">
//           <span>Email ID</span>
//           <span style={{ textTransform: "lowercase" }}>{email}</span>
//         </div>
//         <div className="profileField">
//           <span>Mobile Number</span>
//           <span>{phone}</span>
//         </div>
//         <div className="profileField">
//           <span>City</span>
//           <span>{userDetails.city}</span>
//         </div>
//         <div className="profileField">
//           <span>Points Earned</span>
//           <span>
//             {userDetails.points}
//             <img src={Edit} onClick={handleEditClick} alt="Edit Points" />
//           </span>
//         </div>
//         <div className="profileField">
//           <span>Points Spent</span>
//           <span>NIL</span>
//         </div>
//         <div className="profileField">
//           <span>Membership Cost</span>
//           <span>
//             {userDetails.membershipCost}
//             <img src={Edit} alt="Edit Membership Cost" />
//           </span>
//         </div>
//       </div>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>&times;</span>
//             <h2>Adjust Points</h2>
//             <p>Current Points: {userDetails.points}</p>
//             <div>
//               <button onClick={handleDecrementPoints}>-</button>
//               <input
//                 type="text"
//                 value={pointsChange}
//                 readOnly
//                 style={{ width: '50px', textAlign: 'center', margin: '0 10px' }}
//               />
//               <button onClick={handleIncrementPoints}>+</button>
//             </div>
//             {!submitAttempted && (
//               <button onClick={handleSendOtp}>Send OTP</button>
//             )}
//             {submitAttempted && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={handleOtpChange}
//                 />
//                 <button onClick={handleOtpSubmit}>Submit OTP</button>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDetailsPage;







// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import './userProfile.css';
// import Edit from './Frame(11).svg'
// import { BASE_URL, RAZORPAY_USERS } from '../../utils/ApplicationURL';

// const UserDetailsPage = () => {
//   const { user_id } = useParams();
//   const [userDetails, setUserDetails] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [pointsChange, setPointsChange] = useState(0);

//   const handleEditClick = () => {
//     setShowModal(true);
//     setPointsChange(0);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setOtp('');
//     setError('');
//     setPointsChange(0);
//   };

//   const handleOtpChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleOtpSubmit = () => {
//     if (otp === '123456') {
//       console.log('OTP verified. Points can be updated.');
//       setError('');
//       handleCloseModal();
//     } else {
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}${RAZORPAY_USERS}/${user_id}`);
//         // const response = await axios.get(`http://localhost:5000/api/razor-pay-users/${user_id}`);

//         setUserDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUserDetails();
//   }, [user_id]); // Fetch user details when user_id changes

//   if (!userDetails) {
//     return <div>Loading...</div>; // Display loading message or spinner while data is being fetched
//   }

//   const handleIncrementPoints = () => {
//     setPointsChange(pointsChange + 1);
//   };

//   const handleDecrementPoints = () => {
//     setPointsChange(pointsChange - 1);
//   };

//   const handlePointsSubmit = () => {
//     setShowModal(true);
// };


//   const phone = userDetails.phone
//   const email = userDetails.email

//   return (
//     <div>
//       <div className='profileContainer'>

//         <div className='leftProfile'>
//           <div className='Profilename'>hello {userDetails.name},</div>
//           <div>
//             <div className="profileField" >
//               <span>unique id</span>
//               <span className='end'>{userDetails.user_id}</span>
//             </div>

//             <div className="profileField">
//               <span>mail id</span>
//               <span style={{ textTransform: "lowercase" }} >{email}</span>
//             </div>

//             <div className="profileField">
//               <span>mobile number</span>
//               <span>{phone}</span>
//             </div>

//             <div className="profileField">
//               <span>city</span>
//               <span>{userDetails.city}</span>
//             </div>

//             <div className="profileField">
//               <span >Points earned</span>
//               <span>{userDetails.points}
//                 <img src={Edit} onClick={handleEditClick} />
//               </span>
//             </div>

//             <div className="profileField">
//               <span>Points spent </span>
//               <span>NIL</span>
//             </div>

//             <div className="profileField">
//               <span>Membership Cost </span>
//               <span>{userDetails.membershipCost}
//                 <img src={Edit} />

//                 {/* <button className='MCBtn'>Change</button> */}
//               </span>

//               {showModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={handleCloseModal}>&times;</span>
//                         <h2>Adjust Points</h2>
//                         <p>Current Points: {userDetails.points}</p>
//                         <div>
//                             <button onClick={handleDecrementPoints}>-</button>
//                             <input
//                                 type="text"
//                                 value={pointsChange}
//                                 readOnly
//                                 style={{ width: '50px', textAlign: 'center', margin: '0 10px' }}
//                             />
//                             <button onClick={handleIncrementPoints}>+</button>
//                         </div>
//                         <button onClick={handlePointsSubmit}>Submit Points Change</button>
//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         {otp !== '' && (
//                             <>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter OTP"
//                                     value={otp}
//                                     onChange={handleOtpChange}
//                                 />
//                                 <button onClick={handleOtpSubmit}>Submit OTP</button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetailsPage;
