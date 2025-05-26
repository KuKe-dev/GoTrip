import React from 'react';
import Logo from '../forms/Logo.jsx'
import RegisterForm from "../forms/RegisterForm.jsx";
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="register-side">
        <Logo />
        <RegisterForm />
      </div>

      <div className="info-side">
        <div className="info-box">
          <h1>¡Únete a goTrip!</h1>
          <p>Crea tu cuenta y empieza a guardar recuerdos.</p>
          <p>Explora lugares, comparte aventuras y conecta con otros viajeros.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
