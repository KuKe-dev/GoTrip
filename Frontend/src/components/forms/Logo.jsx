import React from 'react';
import logo from '../../assets/logo-gotrip.png'; // pon aquí tu imagen/logo
import './Logo.css';

const Logo = () => (
  <div className="logo">
    <img src={logo} alt="GoTrip Logo" />
  </div>
);

export default Logo;
