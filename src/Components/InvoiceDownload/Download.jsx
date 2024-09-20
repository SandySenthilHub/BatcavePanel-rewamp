import React from 'react';
import html2pdf from 'html2pdf.js';
import InvoiceLogo from './logo.svg'
import './download.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe as solidGlobe } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

class PageDownloader extends React.Component {
    downloadPageAsPDF = () => {
        try {
            // Get the HTML content of the component
            const contentElement = document.getElementById('content-to-download');
            const htmlContent = contentElement.outerHTML;

            // const htmlContent = document.documentElement.outerHTML;

            // Options for html2pdf
            const options = {
                // margin: 10,
                filename: 'react_page.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                
            };

            // Convert HTML to PDF
            html2pdf().from(htmlContent).set(options).save();
        } catch (error) {
            console.error('Error downloading page:', error);
        }
    };

    render() {
        return (
            <>
                <button onClick={this.downloadPageAsPDF}>Download React Page as PDF</button>
                {/* Your React content goes here */}
                {/* <div className='ContainerIn'> */}
                    <div id="content-to-download">
                        <div id='InvoicePage'>
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
                {/* </div> */}
            </>

        );
    }
}

export default PageDownloader;
