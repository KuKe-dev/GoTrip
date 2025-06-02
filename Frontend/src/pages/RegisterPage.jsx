import React from 'react';
import Logo from '../components/forms/Logo.jsx'
import RegisterForm from "../components/forms/RegisterForm.jsx";
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className="register-side">
        <div className="register-logo" onClick={() => window.location.href = "/" }>
        <Logo />
        </div>
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
