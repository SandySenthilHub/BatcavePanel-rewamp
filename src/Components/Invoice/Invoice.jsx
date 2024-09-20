import React, { useState } from 'react';
import './Invoice.css';
import logo from '../Dashboard/Frame.svg'
import Profile from '../Dashboard/Ellipse 1.svg'
import Arrow from '../Dashboard/chevron-down.svg'
import Pwd from '../Dashboard/pwd.svg';
import ph from '../Dashboard/ph_key.svg';
import BackArror from './BackArrow.svg'
import Download from './Download.svg'
import InvoiceLogo from './logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe as solidGlobe } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const Invoice = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
            <div>
                <div className='Container1'>


                    <div className='header'>
                        <div className='logo'>
                            <img src={logo} alt='' />
                        </div>
                        <div className='profile'>
                            <img className="profileimg" src={Profile} alt='' />
                            <div>
                                <div>abcdefg hijklm pqrst</div>
                                <div>super admin</div>

                            </div>
                            <img className="arrow" src={Arrow} alt='' height={4} width={6} onClick={toggleDropdown} />
                            {showDropdown && (
                                <div className='dropdown'>
                                    <div className='dropdownCon'>
                                        <img src={Pwd} alt='' />
                                        <span>Change Password</span>
                                    </div>

                                    <div className='dropdownCon'>
                                        <img src={ph} alt='' />
                                        <span>Logout</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='body'>
                        <div className='Success'>
                            <div className='Home' >
                                <img src={BackArror} alt="" />
                                <div className='Home1'>Home</div>
                            </div>

                            <div className='SuccessContainer'>
                                <div>Registration successfull</div>
                                <div>unique id - bc2024000025</div>
                            </div>
                        </div>

                        <div className='InvoiceHeader'>
                            <div className='Home' >
                                <div className='InvoiceContent'>Invoice</div>
                            </div>
                            <div className='Download'>
                                <img src={Download} alt="" />
                                <div className='InvoiceContent'>Download</div>
                            </div>
                        </div>
                        <div >


                            <div className='InvoicePage'>
                                <div className='InvoiceHeading'>
                                    <div>INVOICE</div>
                                    <img src={InvoiceLogo} alt="" />
                                </div>

                                <div className='InContainer1'>
                                    <div>To</div>
                                    <div>UNIQUE ID - BC2024000025</div>
                                    <div>
                                        <span>NAME - Sandhya S</span>
                                        <span className='phone'>PH.NO - 9874563210</span>
                                    </div>

                                    <div>
                                        <span>EMAIL - sandhya.s@invicious.in</span>
                                        <span className='dob'>DOB - 29/09/2001</span>
                                    </div>

                                    <div>SHIPPING ADDRESS - 10/7B Arima Wakefield, Peelamedu, Coimbatore - 641041</div>
                                    <div>CITY - Coimbatore</div>

                                </div>
                                <div className='endline'></div>

                                <div className='ItemDes'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Item Description</th>
                                                <th>Price</th>
                                                <th>Discount</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Batcave OGs (Membership Plan)</td>
                                                <td>₹7,499</td>
                                                <td>₹499</td>
                                                <td>1</td>
                                                <td>₹7,000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className='Note'>
                                    <div>Note:</div>
                                    <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id excepturi fugit iusto sunt vero ducimus quos quo quam distinctio culpa dicta architecto nisi eveniet unde labore quia, minus esse ipsam?</div>
                                </div>


                            </div>

                            
                            <div className='Membership'>
                                <div className='MembershipCon'>
                                    <div>
                                        <span className='MembershipPlan'>MEMBERSHIP PLAN</span>
                                        <span className='batcave'>BATCAVE OG<span>s</span></span>
                                    </div>
                                    <div>(Lifetime access)</div>
                                    <div>
                                        <span>CGST</span>
                                        <span>+ ₹ 258</span>
                                    </div>
                                    <div>
                                        <span>GST</span>
                                        <span>+ ₹ 398</span>
                                    </div>
                                    <div>
                                        <span>GRAND TOTAL</span>
                                        <span>₹ 7,000</span>
                                    </div>

                                </div>
                                <div className='endline1'></div>


                                <div className="Footer">
                                    <div className='thankyou'>THANK YOU</div>
                                    <div className='socialMedia'>
                                        <div>
                                            <span> <FontAwesomeIcon icon={faInstagram} className='icon' />@batcave.club</span>
                                            <span>   <FontAwesomeIcon icon={faEnvelope} className='icon' />info@batcave.club</span>

                                        </div>
                                        <div>
                                            <span> <FontAwesomeIcon icon={solidGlobe} className='icon' /> www.batcave.club</span>
                                            <span> <FontAwesomeIcon icon={faPhone} className='icon' />+91 7550057267</span>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>

        </>


    )
}

export default Invoice;
