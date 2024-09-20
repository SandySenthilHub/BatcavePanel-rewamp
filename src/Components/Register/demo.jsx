import React, { useState, useEffect } from "react";
import css from "./Register.module.css";
import Tick from "../../assets/Tick.svg";
import { motion } from "framer-motion";
import Hclose from "../../assets/close-hexagon.svg"
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from '../FormContext/FormContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOBInput from "../DOBInput/DOBInput";

import Logo from "../../assets/Header_new_1.svg"
import { useLocation } from 'react-router-dom'
import { flushSync } from "react-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  // const [couponCode, setCouponCode] = useState('');
  const [orderId, setOrderId] = useState('');
  // const [carRegistrationNumber, setCarRegistrationNumber] = useState('');
  // const [carDetails, setCarDetails] = useState(null);  // Backend 
  const navigate = useNavigate();



  // const [state, setState] = useState(1);

  // const [openedt, setOpenedt] = useState(false)
  // const [openedp, setOpenedp] = useState(false)

  const { showFirstForm, showSecondForm, setShowFirstForm, setShowSecondForm } = useFormContext();
  const { formId } = useParams(); // Get the URL parameter


  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {
      full_name: "",
      email: "",
      mobile: "",
      address: "",
      dob: "",
      gender: "",
      city: "",
      couponCode: ''
    };
  });

  // const [email, setEmail] = useState('');
  // const [isValidEmail, setIsValidEmail] = useState(true);
  // const [number, setNumber] = useState('');
  // const [isValidNumber, setIsValidNumber] = useState(true);


  const [date, setDate] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    const numericDate = inputDate.replace(/[^0-9]/g, '');

    if (numericDate.length === 8) {
      const day = numericDate.slice(0, 2);
      const month = numericDate.slice(2, 4);
      const year = numericDate.slice(4, 8);

      const today = new Date();
      const birthDate = new Date(`${year}-${month}-${day}`);

      let ageDiff = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        ageDiff--;
      }

      if (ageDiff < 18) {
        setErrordob('Age must be 18 years or above');
      } else {
        setErrordob('');
        setDate(`${day}/${month}/${year}`);
        localStorage.setItem("dob", numericDate);
      }
    } else {
      setErrordob('');
      setDate(inputDate);
    }
  };


  // function isFormFilled(formData) {

  //   const {
  //     full_name,
  //     email,
  //     address,
  //     mobile,
  //     dob,
  //     gender,
  //     city
  //   } = formData;
  // }

  // Usage:
  // const formFilled = isFormFilled(formData);

  const [isChecked, setIsChecked] = useState(false);

  // const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Depending on the URL parameter, set the form state
    if (formId === '1') {
      setShowFirstForm(true);
      setShowSecondForm(false);
    } else if (formId === '2') {
      setShowFirstForm(false);
      setShowSecondForm(true);
    }
  }, [formId, setShowFirstForm, setShowSecondForm]);

  // const [isMobileValid, setIsMobileValid] = useState(false);

  // const [formDate, setFormDate] = useState({
  //   dob: "",
  // });


  //  car reg oct4

  // const [carData, setCarData] = useState({
  //   carOwnership: isChecked, // Store the checkbox value
  //   registrationNumber: "",
  //   // Add other car-related fields as needed
  // });



  // Load form data and checkbox state from localStorage on component mount
  // useEffect(() => {
  //   const storedFormData = JSON.parse(localStorage.getItem("formData"));
  //   const storedCheckboxState = JSON.parse(localStorage.getItem("checkboxState"));

  //   if (storedFormData) {
  //     setFormData(storedFormData);
  //   }

  //   if (storedCheckboxState) {
  //     setIsChecked(storedCheckboxState);
  //   }
  // }, []);

  // Save form data and checkbox state to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("checkboxState", JSON.stringify(isChecked));
  }, [isChecked])




  // Load the car input field value from localStorage on component mount
  // useEffect(() => {
  //   const storedInputValue = localStorage.getItem("carInputValue");
  //   if (storedInputValue) {
  //     setInputValue(storedInputValue);
  //   }
  // }, []);

  // Save the car input field value to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("carInputValue", inputValue);
  // }, [inputValue]);



  // Load the car registration number value from localStorage on component mount
  // useEffect(() => {
  //   const storedCarRegistrationNumber = localStorage.getItem("carRegistrationNumber");
  //   if (storedCarRegistrationNumber) {
  //     setCarData({
  //       ...carData,
  //       registrationNumber: storedCarRegistrationNumber,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));

    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);



  // Save Form 1 data to localStorage whenever it changes

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);


  // Remove the local storage item for form1 when the page is refreshed
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      localStorage.removeItem("formData");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);




  // Handle the page refresh event for form2
  const handleRefresh = () => {
    // Clear the data in localStorage
    localStorage.clear();

    // Clear the React state
    setFormData({});
    setIsChecked(false);
    setInputValue("");
    // setCarData({ carOwnership: false, registrationNumber: "" });

  };

  // Add an event listener for the beforeunload event to trigger handleRefresh
  useEffect(() => {
    window.addEventListener("beforeunload", handleRefresh);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  const [opened, setOpened] = useState(false)
  const [sopened, setsOpened] = useState(false)

  const [userId, setUserId] = useState('');
  const [couponCodeNew, setCouponCodeNew] = useState('');
  const [error, setError] = useState('');
  const [errordob, setErrordob] = useState('');

  const [isValidCoupon, setIsValidCoupon] = useState(false);


  const handleApplyCouponNew = async () => {
  
    try {
      const response = await axios.post('http://localhost:5000/api/check-coupon', { couponCode: couponCodeNew });
      if (response.data.valid) {
        setIsValidCoupon(true);
        console.log('Coupon applied successfully');
        setFormattedCouponAmount('799'); // Set the coupon amount to fixed value
        const newGrandTotal = membershipAmount - 799; // Subtract coupon amount from membership amount
        setFormattedGrandTotal(newGrandTotal.toString());
      } else {
        setIsValidCoupon(false);
        console.log('Coupon code already used');
        setError(response.data.message);


      }
    } catch (error) {
      console.log('Error checking coupon:', error);
      setError('Coupon code is invalid');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user', {
        ...formData, 
        dob: date,
        couponCode: couponCodeNew

      });
      console.log(response.data);
      const { user_id, email,number, full_name } = response.data; 
      setUserId(user_id);
      localStorage.setItem('userId', user_id);
      localStorage.setItem('full_name', full_name);
      localStorage.setItem('email', email); 
      localStorage.setItem('number', number); 

      navigate('/thankyou');
    } catch (error) {
      console.error(error.response.data);
    }
  };
  


  useEffect(() => {
    // Load userId from localStorage on component mount
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      console.log(storedUserId)
      setUserId(storedUserId);
    } else {
      console.log('userId is not stored');
    }
  }, []);

  const [stateH, setStateH] = useState(false)
  const location = useLocation();

  let buttonContent, buttonLink;

  if (location.pathname === '/') {

    buttonLink = '/register';
  } else {

    buttonLink = '/';
  }


  const headerContent = location.pathname === '/' ? (
    <button className={css.registermainbtn}>register</button>
  ) : (
    <button className={css.registermainbtn2}>back to home</button>
  );

  const scrollDown = () => {
    window.scrollY >= 1 ? setStateH(true) : setStateH(false);
  }

  window.addEventListener('scroll', scrollDown)



  // razor pay
  const [formattedMembershipAmount, setFormattedMembershipAmount] = useState('2499');
  const [formattedCouponAmount, setFormattedCouponAmount] = useState('0');
  const [formattedGrandTotal, setFormattedGrandTotal] = useState('2499');

  const membershipAmount = 2499;
  const couponAmount = 799;
  const grandTotal = membershipAmount - couponAmount; 

  const handlePayment = async () => {

    try {
      const response = await axios.post('http://localhost:5000/api/payment', { amount: formattedGrandTotal });
      const { orderId } = response.data;
      setOrderId(orderId);

      const options = {
        key: 'rzp_test_alcoQbCT45ueXp',
        amount: formattedGrandTotal * 100,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Membership Payment',
        order_id: orderId,
        handler: function (response) {
          // alert('Payment successful');
          handleSubmit(); 
         
        },
        prefill: {
          name: 'Sandhya',
          email: 'sandhya.s@invicious.in',
          contact: '9087833685',
        },
        notes: {
          address: 'Sandhya',
        },
        theme: {
          color: '#F37254',
        },
      };

      if (window.Razorpay) {
        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.success', function (response) {
            alert('Payment successful');
            handleSubmit();
        });
        paymentObject.on('payment.error', function (error) {
            // alert('Payment failed');
            paymentObject.close(); 
            toast.error('Your payment was not successful, Please try again',{
              position: toast.POSITION.BOTTOM_CENTER
            });
            
        });
        paymentObject.open();
    } else {
        console.error('Razorpay SDK not loaded');
    }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }; 

  useEffect(() => {
    let script; // Declare script variable outside the loadRazorpay function

    // Load Razorpay SDK dynamically when the component mounts
    const loadRazorpay = async () => {
      script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay SDK loaded');
      };
      document.body.appendChild(script);
    };

    loadRazorpay();

    // Clean up function to remove the script when the component unmounts
    return () => {
      if (script) {
        document.body.removeChild(script); // Safely remove the script if it exists
      }
    };
  }, []);


  return (
    <>
      <div className={stateH ? css.newcontainer : css.containerH}  >
        <div className={css.logo_container}>
          <img className={css.logo} src={Logo} alt="" />
        </div>
      </div>

      <div className={css.container}>
        <div className={css.wrap}>

          <div className={css.left}>
            <div className={css.relativediv}>
              <div className={css.formdiv}>
                {/* <p>{user_id}</p> */}

                {/* form-1 */}
                {showFirstForm && (
                  <form className={css.form1} action="">

                    <div className={css.inputset}>
                      <input
                        required
                        name="full_name"
                        onChange={handleChange}
                        value={formData.full_name}
                        className={css.contactinp}
                        type="text"


                      />
                      <label className={css.label}>
                        <span className={css.char} style={{ transitionDelay: '00ms' }}>F</span>
                        <span className={css.char} style={{ transitionDelay: '50ms' }}>U</span>
                        <span className={css.char} style={{ transitionDelay: '100ms' }}>L</span>
                        <span className={css.char} style={{ transitionDelay: '150ms' }}>L</span>
                        <span className={css.char} style={{ transitionDelay: '150ms' }}></span>
                        <span className={css.char} style={{ transitionDelay: '200ms' }}>N</span>
                        <span className={css.char} style={{ transitionDelay: '250ms' }}>A</span>
                        <span className={css.char} style={{ transitionDelay: '300ms' }}>M</span>
                        <span className={css.char} style={{ transitionDelay: '350ms' }}>E</span>
                        <span className={css.char} style={{ transitionDelay: '300ms' }}>*</span>


                      </label>
                      {/* <div className={css.inputline}></div> */}
                    </div>

                    <div className={`${css.inputset} ${formData.email ? css.hasContent : ""}`}>
                      <input style={{ textTransform: "lowercase" }}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={css.contactinp}
                        type="email"
                        required
                        placeholder=""
                      />
                      <label className={css.label}>
                        <span className={css.char} style={{ transitionDelay: '00ms' }}>E</span>
                        <span className={css.char} style={{ transitionDelay: '50ms' }}>M</span>
                        <span className={css.char} style={{ transitionDelay: '100ms' }}>A</span>
                        <span className={css.char} style={{ transitionDelay: '150ms' }}>I</span>
                        <span className={css.char} style={{ transitionDelay: '200ms' }}>L</span>
                        <span className={css.char} style={{ transitionDelay: '250ms' }}></span>
                        <span className={css.char} style={{ transitionDelay: '300ms' }}>I</span>
                        <span className={css.char} style={{ transitionDelay: '350ms' }}>D</span>
                        <span className={css.char} style={{ transitionDelay: '300ms' }}>*</span>

                      </label>
                      {/* <div className={css.inputline}></div> */}
                    </div>

                    <div className={`${css.inputset} ${formData.number ? css.hasContent : ""}`}>
                      <input
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className={css.contactinp}
                        type="text"
                        pattern="[1-9]{1}[0-9]{9}"
                        required
                        placeholder=""
                        // pattern="[0-9]{10}" 
                        minLength={10}
                        maxLength="10"
                        title="Enter numbers(10 digit)"
                      //  onBlur={handleMobileNumberBlur}

                      />
                      <label className={css.label}>
                        <span className={css.char} style={{ transitionDelay: '00ms' }}>M</span>
                        <span className={css.char} style={{ transitionDelay: '50ms' }}>O</span>
                        <span className={css.char} style={{ transitionDelay: '100ms' }}>B</span>
                        <span className={css.char} style={{ transitionDelay: '150ms' }}>I</span>
                        <span className={css.char} style={{ transitionDelay: '200ms' }}>L</span>
                        <span className={css.char} style={{ transitionDelay: '250ms' }}>E</span>
                        <span className={css.char} style={{ transitionDelay: '300ms' }}></span>
                        <span className={css.char} style={{ transitionDelay: '350ms' }}>N</span>
                        <span className={css.char} style={{ transitionDelay: '400ms' }}>U</span>
                        <span className={css.char} style={{ transitionDelay: '450ms' }}>M</span>
                        <span className={css.char} style={{ transitionDelay: '500ms' }}>B</span>
                        <span className={css.char} style={{ transitionDelay: '550ms' }}>E</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>R</span>
                        <span className={css.char} style={{ transitionDelay: '650ms' }}>*</span>

                      </label>
                      {/* <div className={css.inputline}></div> */}
                    </div>

                    <div className={`${css.inputset} ${date ? css.hasContent : ""}`}>
                      <input
                        name="dob"
                        value={date}

                        onChange={handleDateChange}
                        className={css.contactinp}
                        type="text"
                        required
                        placeholder=""
                        maxLength="10"
                        pattern="\d{2}/\d{2}/\d{4}"
                      />
                      <label className={css.label}>
                        <span className={css.char} style={{ transitionDelay: '00ms' }}>D</span>
                        <span className={css.char} style={{ transitionDelay: '50ms' }}>A</span>
                        <span className={css.char} style={{ transitionDelay: '100ms' }}>T</span>
                        <span className={css.char} style={{ transitionDelay: '150ms' }}>E</span>
                        <span className={css.char} style={{ transitionDelay: '200ms' }}></span>
                        <span className={css.char} style={{ transitionDelay: '250ms' }}>O</span>
                        <span className={css.char} style={{ transitionDelay: '300ms' }}>F</span>
                        <span className={css.char} style={{ transitionDelay: '350ms' }}></span>
                        <span className={css.char} style={{ transitionDelay: '400ms' }}>B</span>
                        <span className={css.char} style={{ transitionDelay: '450ms' }}>I</span>
                        <span className={css.char} style={{ transitionDelay: '500ms' }}>R</span>
                        <span className={css.char} style={{ transitionDelay: '550ms' }}>T</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>H</span>
                        <span className={css.char} style={{ transitionDelay: '650ms' }}></span>

                        <span className={css.char} style={{ transitionDelay: '600ms' }}>[</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>D</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>D</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>/</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>M</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>M</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>/</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>Y</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>Y</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>Y</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>Y</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>]</span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>*</span>






                      </label>
                      <DOBInput />
                      {errordob && <div style={{ color: "white", fontSize: "12px", fontFamily: "K2D" }} >{errordob}</div>}
                    </div>

                    <div className={css.inputset}>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className={css.contactinp}
                        id=""
                        style={{
                          color:
                            formData.city === "" ? "#666" :
                              formData.city === "Coimbatore" ? "#fff" :
                                formData.city === "Chennai" ? "#fff" :
                                  formData.city === "Madurai" ? "#fff" :
                                    formData.city === "Trichy" ? "#fff" :
                                      formData.city === "Erode" ? "#fff" :
                                        "#666",
                                        fontFamily:"k2d"
                        }}
                      >
                        <option className={css.opt} value="" >
                          {" "}
                          cITY*
                        </option>


                        <option className={css.opt} value="Coimbatore">
                          Coimbatore
                        </option>
                        <option className={css.opt} value="Chennai">
                          Chennai
                        </option>
                        <option className={css.opt} value="Madurai">
                          Madurai
                        </option>
                        <option className={css.opt} value="Trichy">
                          Trichy
                        </option>

                        <option className={css.opt} value="Erode">
                          Erode
                        </option>

                      </select>

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
                      />
                      <label className={css.label}>
                        <span className={css.char} style={{ transitionDelay: '00ms' }}>S</span>
                        <span className={css.char} style={{ transitionDelay: '50ms' }}>H</span>
                        <span className={css.char} style={{ transitionDelay: '100ms' }}>I</span>
                        <span className={css.char} style={{ transitionDelay: '150ms' }}>P</span>
                        <span className={css.char} style={{ transitionDelay: '150ms' }}>P</span>
                        <span className={css.char} style={{ transitionDelay: '200ms' }}>I</span>
                        <span className={css.char} style={{ transitionDelay: '250ms' }}>N</span>
                        <span className={css.char} style={{ transitionDelay: '300ms' }}>G</span>
                        <span className={css.char} style={{ transitionDelay: '550ms' }}></span>
                        <span className={css.char} style={{ transitionDelay: '600ms' }}>A</span>
                        <span className={css.char} style={{ transitionDelay: '650ms' }}>D</span>
                        <span className={css.char} style={{ transitionDelay: '700ms' }}>D</span>
                        <span className={css.char} style={{ transitionDelay: '750ms' }}>R</span>
                        <span className={css.char} style={{ transitionDelay: '800ms' }}>E</span>
                        <span className={css.char} style={{ transitionDelay: '850ms' }}>S</span>
                        <span className={css.char} style={{ transitionDelay: '900ms' }}>S</span>
                        <span className={css.char} style={{ transitionDelay: '950ms' }}>*</span>


                      </label>
                    </div>

                    <div className={css.inputset}>
                      <div className={css.applydiv}>
                        <input className={css.contactinp}
                          type="text"
                          name="couponCodeNew"
                          placeholder='apply coupon'
                          value={formData.couponCodeNew}
                          onChange={(e) => setCouponCodeNew(e.target.value)}
                        />
                        {/* <button className={css.inputsetbtn}> */}
                          <img className={css.inputsetbtn} src={Tick} onClick={handleApplyCouponNew} alt="" />
                          {/* </button> */}
                      </div>
                      {/* <div style={{color:"white"}}>dbcdsnhsdb</div> */}
                      {error && <div style={{ color: "white", fontSize: "12px", fontFamily: "K2D" }} >{error}</div>}
                    </div>

                  </form>
                 
                )}

              </div>
            </div>
          </div>

          <div className={css.right}>
            <div className={css.relativediv}>
              <div className={css.formdiv}>

                <div className={css.line1}>
                  <span>MEMBERSHIP</span>
                  <span>BATCAVE OGs</span>
                </div>
                <div className={css.line2}>
                  <span>COST</span>
                  <span>₹ 2,499</span>
                </div>
                <span className={css.checkoutspan}>Checkout summary</span>

                <div className={css.line3}>
                  <span>membership cost</span>
                  <span>₹ {formattedMembershipAmount}</span>
                </div>

                <div className={css.line4}>
                  <span>coupon</span>
                  {isValidCoupon ? <span>-₹ {formattedCouponAmount}</span> : <span> - </span>}
                </div>
                <div className={css.plainline}></div>

                <div className={css.gtotal}>
                  <span>grand total</span>
                  <span>₹ {formattedGrandTotal}</span>
                </div>

                <span className={css.agreespan}>by clicking, I AGREE WITH THE <span
                  onClick={() => setOpened(!opened)}
                  className={css.spaninside}>refund policy </span> &  <span
                    onClick={() => setsOpened(!opened)}
                    className={css.spaninside}>shipping policy </span></span>

                <button
                  // onClick={() => { navigate('/thankyou') }}
                  onClick={handlePayment}
                  // onClick={handleSubmit}

                  type="submit" className={css.proceedbtn}>
                  PROCEED TO PAY
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>


          {/* <Checkout /> */}


        </div>



        {/* refund policy popup */}
        {opened && <motion.div
          initial={{ opacity: 0, x: 130 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className={css.refund} >
          <div className={css.head}>
            <span>Refund policy</span>
            <img onClick={() => setOpened(false)} src={Hclose} alt="" />
          </div>

          <div className={css.content}>
            {/* <span className={css.rhead}>Effective Date: 10-10-2023</span> */}
            <span className={css.rhead}>Membership Refunds:</span>

            <span className={css.rcontent}>At Batcave OGs, we value your membership and your commitment to our community of car enthusiasts. However, please note that all membership fees are non-refundable. We do not offer refunds for membership payments under any circumstances.</span>

            <span className={css.rhead}>Event Registration Refunds:</span>
            <span className={css.rcontent}>For events and activities organised by Batcave OGs, event registration fees may be eligible for refunds, subject to the following conditions:</span>


            <span className={css.rcontent1}>- Full Refund: Cancellations made 3 days or more before the event start date.</span>
            <span className={css.rcontent1}>- Partial Refund: Cancellations made within 3 days before the event start date, subject to a 40% cancellation fee.</span>
            <span className={css.rcontent1}>- No Refund: Cancellations made on or after the event start date.</span>


            <span className={css.rhead}>Refund Process:</span>

            <span className={css.rcontent}>To request a refund for an event or activity, please contact us at refunds@batcave.co.in. Refunds will be processed within 5-7 business days, and the amount refunded will be based on the above refund policy conditions.</span>

            <span className={css.rhead}>Contact Us:</span>
            <span className={css.rcontent}>If you have any questions or concerns about our refund policy, please contact us at support@batcave.co.in.</span>
          </div>





        </motion.div>}

        {/* shipping policy */}
        {sopened && <motion.div
          initial={{ opacity: 0, x: 130 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className={css.shipping} >
          <div className={css.head}>
            <span>Shipping policy</span>
            <img onClick={() => setsOpened(false)} src={Hclose} alt="" />
          </div>

          <div className={css.content}>
            <span className={css.shead}> Effective Date: 10-10-2023 </span>

            <span className={css.shead}>  1. Shipping Information:  </span>

            <span className={css.scontent}>Batcave OGs ("Club") offers shipping services for specific products, merchandise, or promotional items. Shipping may be available to locations within [list the specific regions or countries where you offer shipping]. </span>

            <span className={css.shead}> 2. Shipping Methods: </span>


            <span className={css.scontent1}> We offer the following shipping methods:  </span>
            <span className={css.scontent1}> - Standard Shipping: Estimated delivery time 7-14 Business Days.</span>
            <span className={css.scontent1}> - Express Shipping: Estimated delivery time 4-7 Business Days.</span>

            <span className={css.shead}>3. Order Processing:</span>

            <span className={css.scontent1}> - Orders are typically processed and shipped within 7-10 business days.</span>
            <span className={css.scontent1}> - You will receive a confirmation email with tracking information once your order has shipped.</span>

            <span className={css.shead}>4. Shipping Costs:</span>

            <span className={css.scontent1}> Shipping costs are calculated based on the weight, dimensions, and destination of your order. The exact shipping cost will be displayed during the checkout process.</span>

            <span className={css.shead}>5. Delivery Times:</span>

            <span className={css.scontent1}> Delivery times may vary depending on the shipping method selected and the destination. Estimated delivery times are provided for each shipping method, but please note that these are approximate and not guaranteed. </span>

            <span className={css.shead}>6. International Shipping:</span>
            <span className={css.scontent1}>For international orders, please be aware of any import duties, taxes, or customs fees that may be applicable in your country. These fees are the responsibility of the recipient. </span>


            <span className={css.shead}>7. Lost or Damaged Shipments:</span>
            <span className={css.scontent1}> In the event of a lost or damaged shipment, please contact us at support@batcave.co.in as soon as possible. We will work with the shipping carrier to resolve the issue. </span>


            <span className={css.shead}>8. Tracking Orders:</span>
            <span className={css.scontent1}>You can track the status of your order by using the tracking information provided in your order confirmation email. </span>


            <span className={css.shead}>9. Contact Us:</span>
            <span className={css.scontent1}> If you have any questions or concerns about our shipping policy, please contact us at support@batcave.co.in.  </span>

          </div>





        </motion.div>}


      </div>

    </>
  );
};

export default Register;
