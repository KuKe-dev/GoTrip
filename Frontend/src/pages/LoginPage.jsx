
import { useEffect } from 'react';
import LoginForm from '../components/forms/LoginForm.jsx'
import Logo from '../components/forms/Logo.jsx'
import './LoginPage.css';
import { getCookie, checkIsLogged } from '../scripts/logged';

const LoginPage = () => {

  useEffect(() => {
          const token = getCookie('isLogged');
          checkIsLogged(token).then(res => res.json())
              .then(login => {
                  if (login.res === "true") {
                      window.location.href = "/";
                  }
              })
  
      } , [])

  return (
    <div className="login-container">
      {/* Lado izquierdo - Login */}
      <div className="login-side">
        <div className="login-logo">
        <Logo />
        </div>
        <LoginForm />
      </div>

      {/* Lado derecho - Mensaje de bienvenida */}
      <div className="welcome-side">
      <div className="welcome-box">
        <h1>Bienvenido a goTrip!</h1>
        <p>Tu diario de aventuras, recuerdos y lugares favoritos alrededor del mundo.</p>
        <p>Guarda momentos y compártelos con el mundo.</p>
        <p>Explora el mapa y crea nuevos sueños a donde viajar.</p>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;