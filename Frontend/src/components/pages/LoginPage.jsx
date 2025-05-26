
import LoginForm from '../forms/LoginForm.jsx'
import Logo from '../forms/Logo.jsx'
import '../styles/LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      {/* Lado izquierdo - Login */}
      <div className="login-side">
        <Logo />
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