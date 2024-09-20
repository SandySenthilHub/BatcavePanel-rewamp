import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from "./Register.module.css";
import DOBInput from "../DOBInput/DOBInput";
import { BASE_URL, RAZORPAY_USERS, SEND_EMAIL, SEND_OTP, SEND_OTP_PAY, SEND_SMS, VERIFY_OTP, VERIFY_OTP_PAY } from "../../utils/ApplicationURL";

const Register = () => {

  const navigate = useNavigate();
  const { formId } = useParams();
  const location = useLocation();


  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    const loggedInEmail = localStorage.getItem('email');

    return savedData ? JSON.parse(savedData) : {
      loggedInEmail: loggedInEmail,
      user_id: "",
      name: "",
      email: "",
      phone: "",
      dob: "",
      pincode: "",
      address: "",
      city: "",
      ogSelect: "",
      paymentOption: '',
      paymentMethod: '',
      invoiceDate: '',
      membershipCost: 0,

    };
  });

  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [errordob, setErrordob] = useState('');
  const [errorform, setErrorform] = useState('');


  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showTIDModal, setShowTIDModal] = useState(false);

  const closeModal = () => setShowOtpModal(false);
  const closeTIDModal = () => setShowTIDModal(false);

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const requiredFields = ['name', 'email', 'phone', 'dob', 'pincode', 'address', 'city', 'ogSelect', 'paymentOption', 'paymentMethod', 'invoiceDate'];
    const formComplete = requiredFields.every(field => !!formData[field]);
    setIsFormComplete(formComplete);
  }, [formData]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'paymentOption') {
      let membershipCost = 0;
      if (value === 'Full Payment') {
        membershipCost = 7316;
      } else if (value === 'Half Payment') {
        membershipCost = 3658;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        membershipCost: membershipCost,
      }));
      localStorage.setItem('membershipCost', membershipCost.toString());
    }
    else if (name === 'customAmount' && formData.paymentOption === 'Custom') {
      // Update membershipCost when entering a custom amount
      const customAmount = parseFloat(value);
      if (!isNaN(customAmount) && customAmount >= 0) {
        setFormData((prevData) => ({
          ...prevData,
          membershipCost: customAmount,
        }));
        localStorage.setItem('membershipCost', customAmount.toString());
      }
    }

    if (name === 'dob' || name === 'invoiceDate') {
      // Remove existing slashes and limit to DD/MM/YYYY format
      const formattedDate = value.replace(/\//g, '').slice(0, 10);

      // Insert slashes after day and month
      let formattedValue = '';
      for (let i = 0; i < formattedDate.length; i++) {
        if (i === 2 || i === 4) {
          formattedValue += '/' + formattedDate[i];
        } else {
          formattedValue += formattedDate[i];
        }
      }

      // Update form data with formatted value
      setFormData(prevData => ({
        ...prevData,
        [name]: formattedValue
      }));

      // Perform age validation only for 'dob' field
      if (name === 'dob') {
        // Calculate age based on the provided date of birth
        const dobParts = formattedValue.split('/');
        const dobDate = new Date(`${dobParts[1]}/${dobParts[0]}/${dobParts[2]}`);
        const ageDiffMs = Date.now() - dobDate.getTime();
        const ageDate = new Date(ageDiffMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        // Check if age is below 15
        if (age < 15) {
          setErrordob('Age must be above 15');
        } else {
          setErrordob('');
        }
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };


  const handleSubmit = async () => {
    // e.preventDefault();
    const loggedInEmail = localStorage.getItem('email');

    try {
      // const response = await axios.post('http://localhost:5000/api/razor-pay-users', formData);
      const response = await axios.post(BASE_URL + RAZORPAY_USERS, formData);

      console.log(response);
      console.log(response.data);
      console.log(response.data.user_id);
      const user_id = response.data.user_id
      // Reset form data on successful submission
      setFormData({
        loggedInEmail: loggedInEmail,
        name: '',
        email: '',
        phone: '',
        dob: '',
        pincode: '',
        address: '',
        city: '',
        // user_id: '',
        ogSelect: "",
        paymentOption: '',
        paymentMethod: '',
        invoiceDate: '',
        membershipCost: 0

      });
      setError(''); // Reset error state

      localStorage.setItem('user_id', user_id)

      localStorage.removeItem('formData');
      localStorage.removeItem('invoiceDate');
      localStorage.removeItem('membershipCost');
      setShowOtpModal(false);
      setError('Form submitted successfully!')
      toast.success('Form submitted successfully!');
      setTimeout(() => {
        setError('');
      }, 5000);

      sendEmail();
      sendSMS();

    } catch (error) {
      // Handle error response from the backend
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      toast.error('Failed to submit form. Please try again.');
    }
  };




  const handleSendOTP = async () => {
    try {
      // const response = await axios.post('http://localhost:5000/api/pay/send-otp', {
      const response = await axios.post(BASE_URL + SEND_OTP_PAY, {

        email: localStorage.getItem('email')
      });
      // console.log(response.data);
      setError('');
      setShowOtpModal(true); // Show OTP modal after sending OTP
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Error sending OTP');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // const response = await axios.post('http://localhost:5000/api/pay/verify-otp', {

      const response = await axios.post(BASE_URL + VERIFY_OTP_PAY, {
        email: localStorage.getItem('email'),
        otp
      });

      if (response.data.valid) {
        await handleSubmit();


      } else {

      }
    } catch (error) {
      // Handle API request error
      setError('Invalid OTP. Please try again.');
      toast.error('Invalid OTP. Please try again.');
    }
  };



  const sendEmail = async () => {
    const { name, email, phone, dob, address, city, pincode, invoiceDate, membershipCost } = formData;
    const user_id = localStorage.getItem('user_id')
    console.log("from email", user_id)
    try {
      if (email && name) {
        // const response = await axios.post('http://localhost:5000/api/sendEmail', {
          const response = await axios.post(BASE_URL + SEND_EMAIL, {

          email,
          name,
          dob,
          city,
          pincode,
          state: 'Tamil Nadu',
          grandTotal: membershipCost,
          address1: address,
          phone,
          invoiceDate,
          user_id: user_id
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

  const sendSMS = async () => {
    const { phone, name } = formData;

    const user_id = localStorage.getItem('user_id')
    console.log("from email", user_id)

    try {
      if (phone) {
        // Send SMS using Twilio
        // const response = await axios.post('http://localhost:5000/api/send-sms', {
          const response = await axios.post(BASE_URL + SEND_SMS, {

          to: phone,
          name,
          user_id: user_id
        });

        if (response.status === 200) {
          console.log('SMS sent successfully');
        } else {
          console.log('Failed to send SMS');
        }
      } else {
        console.log('Phone number not found');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Failed to send SMS');
    }
  };



  const loggedInEmail = localStorage.getItem('email')






  return (
    <>

      <div className={css.wrap}>
        <div className={css.left}>
          <div className={css.relativediv}>
            <div className={css.formdiv}>
              <div className={css.newReg}>New Registration</div>
              <form className={css.form1} action="">
                <div className={css.inputset}>
                  <input
                    required
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    className={css.contactinp}
                    type="text"
                    style={{ textTransform: "capitalize" }}


                  />
                  <label className='label'><span className="char">Full Name</span></label>
                </div>

                <div className={`${css.inputset} ${formData.email ? css.hasContent : ""}`}>
                  <input
                    style={{ textTransform: "lowercase" }}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={css.contactinp}
                    type="email"
                    required
                    placeholder=""
                  />
                  <label className='label'><span className="char">Email ID</span></label>
                </div>

                <div className={`${css.inputset} ${formData.phone ? css.hasContent : ""}`}>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={css.contactinp}
                    type="text"
                    pattern="[1-9]{1}[0-9]{9}"
                    required
                    placeholder=""
                    minLength={10}
                    maxLength="10"
                    title="Enter numbers(10 digit)"
                  />
                  <label className='label'><span className="char">Mobile Number</span></label>
                </div>

                <div className={`${css.inputset} ${date ? css.hasContent : ""}`}>
                  <input
                    required
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  <label className='label'><span className="char">DOB</span></label>
                  <DOBInput />
                  {errordob && <div style={{ color: "white", fontSize: "12px", fontFamily: "K2D" }} >{errordob}</div>}
                </div>

                <div className={`${css.inputset} ${formData.number ? css.hasContent : ""}`}>
                  <input
                    required
                    name="pincode"
                    onChange={handleChange}
                    value={formData.pincode}
                    type="text"
                    maxLength="6"
                  />
                  <label className='label'><span className="char">Pincode</span></label>
                </div>

                <div className={css.inputset}>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={css.contactinp}
                    type="text"
                    required
                    placeholder=""
                    style={{ textTransform: "capitalize" }}


                  />
                  <label className='label'><span className="char">Shipping Address</span></label>
                </div>

                {errorform && <div style={{ color: 'red', marginTop: "20px", fontFamily: "k2d" }}>{errorform}</div>}
              </form>
            </div>
          </div>
        </div>

        <div className={css.right}>
          <div className={css.relativediv}>
            <div className={css.formdivRight}>



              <div className={`${css.inputset} ${formData.number ? css.hasContent : ""}`}>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{ textTransform: "capitalize" }}

                />
                <label className='label'><span className="char">City</span></label>
              </div>

              {/* <div className={css.inputset} style={{ marginTop: "0px" }}>
                <input className={css.contactinp}
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleChange}
                  type="text"
                  required
                  maxLength={9}
                />
                <label className='label'><span className="char">Unique ID</span></label>
              </div> */}

              <div className={css.inputset} style={{ marginTop: "0px" }}>
                <select
                  name="ogSelect"
                  value={formData.ogSelect}
                  onChange={handleChange}
                  required
                  className={css.contactinp}
                  id=""
                >
                  <option className={css.opt} value="">Select Membership</option>
                  <option className={css.opt} value="OG">OG</option>
                  <option className={css.opt} value="Regular">Regular</option>

                </select>
              </div>

              <div className={css.inputset} style={{ marginTop: "0px" }}>
                <select
                  name="paymentOption"
                  value={formData.paymentOption}
                  onChange={handleChange}
                  required
                  className={css.contactinp}
                  id=""
                >
                  <option className={css.opt} value="">Select Payment Type</option>
                  <option className={css.opt} value="Full Payment">Full Payment</option>
                  <option className={css.opt} value="Half Payment">Split Payment</option>
                  <option className={css.opt} value="Custom">Custom</option>

                </select>
              </div>
              {formData.paymentOption === 'Custom' && (
                <div className="inputset" style={{ marginTop: '0px', marginBottom: "-30px" }}>
                  <label htmlFor="customAmount" >Custom Amount </label >
                  <input
                    type="number"
                    id="customAmount"
                    name="customAmount"
                    value={formData.customAmount}
                    onChange={handleChange}
                    required
                    className="contactinp"
                    style={{ background: "transparent", border: "none", borderBottom: "1px solid #fff", marginLeft: "10%", color: "#fff", fontSize: "16px", width: "20%" }}
                  />
                </div>
              )}

              <div className={css.inputset} style={{ marginTop: "0px" }}>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className={css.contactinp}
                  id=""
                >
                  <option className={css.opt} value="">Select Payment Method</option>
                  <option className={css.opt} value="Cash">Cash</option>
                  <option className={css.opt} value="UPI">Payment Gateway</option>
                </select>
              </div>

              <div style={{ display: "flex" }} className="lg-d-flex">
                <span className={css.checkoutspan} style={{ marginTop: "18px" }}>Checkout summary</span>
                <div className={`${css.inputset} ${date ? css.hasContent : ""}`} style={{ width: "50%", marginLeft: "21.5%" }}>
                  <input
                    required
                    type="text"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                  />
                  <label className='label'><span className="char">Invoice Date</span></label>
                  <DOBInput />
                  {errordob && <div style={{ color: "white", fontSize: "12px", fontFamily: "K2D" }} >{errordob}</div>}
                </div>
              </div>



              <div className={css.line3}>
                <span>Membership Cost (Inc GST)</span>
                {formData.paymentOption ? (
                  <p>₹ {formData.membershipCost}</p>
                ) : (
                  <p>₹ 0</p>
                )}
              </div>


              <button
                type="submit"
                onClick={handleSendOTP}
                className={css.proceedbtn}
                style={{ marginBottom: "0px" }}
                disabled={!isFormComplete}

              >
                REGISTER
              </button>
              {error && <p style={{ color: '#fff', marginTop: "0px" }}>{error}</p>}

              <ToastContainer />

            </div>

          </div>

        </div>

        {showOtpModal && (
          <div className={css.modalOverlay}>
            <div className="modal " id="otpModel" >
              <div className="modal-content center" id="" style={{ backgroundColor: "#111721", height: "413px", maxWidth: "644px", border: "none", padding: "20px" }}>
                <div style={{ textAlign: "left", marginTop: "30px", marginLeft: "20px" }}>SENT OTP </div>
                <span className="close" onClick={closeModal} style={{ marginTop: "-27px", marginRight: "30px" }}>&times;</span> <br /> <br />

                {error && <p className="error">{error}</p>}
                <div style={{ marginTop: "5%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <div style={{ lineHeight: "25px" }}>Kindly enter the otp that has been sent to <br />{loggedInEmail} to proceed further. </div> <br /><br />
                  <input
                    type="text"
                    maxLength="4"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ background: "transparent", border: "none", borderBottom: "1px solid white", width: "50%", outline: "none", color: "#fff", fontSize: "18px", textAlign: "center", letterSpacing: "19px" }} /> <br /><br /><br />
                  <button type="submit" className={css.otpbtn} onClick={handleVerifyOTP}>Verify</button>
                  {/* {error && <p>{error}</p>} */}

                </div>
              </div>
            </div>
          </div>
        )}






      </div>

    </>

  );
};

export default Register;
