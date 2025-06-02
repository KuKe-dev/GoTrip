import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/login', formData, {
        withCredentials: "true"
      });

    

      // Mensaje visual de éxito
      const messageDiv = document.createElement('div');
      messageDiv.innerText = "¡Inicio de sesión exitoso!";
      messageDiv.style.position = 'fixed';
      messageDiv.style.top = '20px';
      messageDiv.style.left = '50%';
      messageDiv.style.transform = 'translateX(-50%)';
      messageDiv.style.backgroundColor = '#1b5a96';
      messageDiv.style.color = 'white';
      messageDiv.style.padding = '1rem 2rem';
      messageDiv.style.borderRadius = '8px';
      messageDiv.style.zIndex = 9999;
      document.body.appendChild(messageDiv);

      setTimeout(() => {
        document.body.removeChild(messageDiv);
        window.location.href = '/';
      }, 1000);

    } catch (error) {
      // Mensaje visual de error
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        'Error desconocido al iniciar sesión';

      const errorDiv = document.createElement('div');
      errorDiv.innerText = 'Error al iniciar sesión: ' + message;
      errorDiv.style.position = 'fixed';
      errorDiv.style.top = '20px';
      errorDiv.style.left = '50%';
      errorDiv.style.transform = 'translateX(-50%)';
      errorDiv.style.backgroundColor = '#e74c3c';
      errorDiv.style.color = 'white';
      errorDiv.style.padding = '1rem 2rem';
      errorDiv.style.borderRadius = '8px';
      errorDiv.style.zIndex = 9999;
      document.body.appendChild(errorDiv);

      setTimeout(() => {
        document.body.removeChild(errorDiv);
      }, 2000);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      <input
        type="text"
        name="usernameOrEmail"
        placeholder="Username o Email"
        value={formData.usernameOrEmail}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Entrar</button>

      <div className="register-link">
        ¿No estás registrado aún? <a href="/Register">Regístrate aquí</a>
      </div>
    </form>
  );
};

export default LoginForm;
