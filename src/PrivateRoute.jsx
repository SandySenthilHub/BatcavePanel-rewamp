import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  return isLoggedIn ? <Route {...rest} element={<Element />} /> : <Navigate to="/" />;
};

export default PrivateRoute;
