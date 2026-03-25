import React from 'react';
import Navbar from '../Navbar/Navbar';
import Login from './Login';
import Footer from '../Footer/Footer';

const LoginPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Login></Login>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;