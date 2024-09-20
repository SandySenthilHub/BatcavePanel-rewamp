import React from 'react';
import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/dashboard";
import Register from "./Components/Registeration/Register";
import Register1 from "./Components/Register/Register";
import Invoice from "./Components/Invoice/Invoice";
import Download from "./Components/InvoiceDownload/Download";
import ResetPassword from './Components/ResetPassword/resetpassword';
import ForgotPassword from './Components/ForgotPassword/forgot';
import MembershipCostForm from './Components/Membership/membership';
import Countdown from './Components/Countdown/Countdown';
import Data from './Components/Registeration/Data';
import UserData from './Components/Registeration/userProfile';
import RegisteredData from './Components/Registeration/RegUserData';
import RegUserDataTable from './Components/Register/registerData';
import SlotDate from './Components/Registeration/SlotBookingDate';
import SlotBook from './Components/Register/SlotBookDate';
import MTData from './Components/Registeration/MTDatas';
import NewOGRegisteredData from './Components/Registeration/NewRegOG';
import EventRegistrations from './Components/Registeration/Event_Registration';
import BlogForm from './Components/blog/blog';
import Blog from './Components/blog/blogCRUD';
import EditBlog from './Components/blog/editBlog';
import { ToastContainer } from 'react-toastify';
import BuyCar from './Components/Registeration/carBuy';
import CarRequestDetails from './Components/Register/buyCarDetails';
import Poll from './Components/Poll/poll';
import Phonepe from './Components/Phonepe/phonepe';
import PhonepePayment from './Components/Phonepe/phonepePayment';
import PhonepePaymentDetails from './Components/Phonepe/paymentDetails';
import Sidebar from './Components/menu/menu';
import 'react-toastify/dist/ReactToastify.css';

// Admin

import AdminDashboard from './AdminComponents/dashboard';
import AllRegisteredData from './AdminComponents/RegUserData';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/countdown" element={<Countdown />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register1" element={<Register1 />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/download" element={<Download />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/MemberShipCost" element={<MembershipCostForm/>} />
          <Route path="/userdata" element={<Data/>} />
          <Route path="/registered-userdata" element={<RegisteredData/>} />
          <Route path="/regular-userdata" element={<MTData/>} />
          <Route path="/register-OGuserdata" element={<NewOGRegisteredData/>} />


          {/* <Route path="/registered-userdata" element={<RegUserDataTable/>} /> */}

          <Route path="/user-details/:user_id" element={<UserData/>} />

          <Route path="/slotDate" element={<SlotBook/>} />


          {/* <Route path="http://localhost:3001/#/profile/:user_id" element={<UserData/>} /> */}

          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/registered-users" element={<AllRegisteredData/>} />

          <Route path="/BFF-event" element={<EventRegistrations/>} />
          <Route path="/blog" element={<BlogForm/>} />
          <Route path="/edit-blog" element={<Blog/>} />
          <Route path="/edit/:blogId" element={<EditBlog />} />

          <Route path="/buy-car" element={<BuyCar />} />
          <Route path="/car-request/:id" element={<CarRequestDetails />} />
          <Route path="/poll" element={<Poll />} />
          <Route path="/phonepe" element={<Phonepe />} />
          <Route path="/payment" element={<PhonepePayment />} />
          <Route path="/payment-details" element={<PhonepePaymentDetails/>} />
          <Route path="/sidebar" element={<Sidebar/>} />












        </Routes>
      </Router>
      <ToastContainer 
      position="top-center" 
      autoClose={2000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover
     
      bodyClassName="blue-toast" 
      />
      <style>
        {`
          .Toastify__progress-bar {
            background-color: #0287D1; // Change background color of the progress bar to blue
          }
          .Toastify__progress-bar--dark {
            background-color: #0287D1; 
          }
          .Toastify__toast--success svg {
            fill: #0287D1; 
          }
        `}
      </style>

    </div>
  );
}

export default App;
