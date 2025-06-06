
import { useEffect, useState } from 'react';
import LoginForm from '../components/forms/LoginForm.jsx'
import Logo from '../components/forms/Logo.jsx'
import './LoginPage.css';
import { getCookie, checkIsLogged } from '../scripts/logged';
import LoadingScreen from '../components/loadingScreen/LoadingScreen.jsx';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
          checkIsLogged().then(res => res.json()).then(setIsLoading(false));
      } , [])

  if (isLoading) {
    return <LoadingScreen message="Cargando..." />;
  }

  return (
    <div className="login-container">
      {/* Lado izquierdo - Login */}
      <div className="login-side">
        <div className="login-logo" onClick={() => window.location.href = "/" }>
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