import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
  const navigate = useNavigate();

  


  const handleChange = (e) => {
    /* setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }); */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const avatarFile = document.getElementById('avatar').files[0];

    formData.append('username', document.getElementById('username').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('avatar', avatarFile);
    formData.append('bio', document.getElementById('bio').value);

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/register', formData);
      
      // Mostrar alerta bonita con setTimeout para redirección
      const messageDiv = document.createElement('div');
      messageDiv.innerText = "¡Registro exitoso! Redirigiendo al inicio de sesión...";
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
        navigate('/login'); // redirige al login
      }, 1000); // 2 segundos de espera
  
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        'Error desconocido al registrarse';

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
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Crear Cuenta</h2>

      <input
        id="username"
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        onChange={handleChange}
        required
      />

      <input
        id="email"
        type="email"
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
        required
      />

      <input
        id="password"
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
      />

      <input
        id="avatar"
        type="file"
        name="avatar"
        placeholder="URL del avatar (opcional)"
        onChange={handleChange}
      />

      <textarea
        id="bio"
        name="bio"
        placeholder="Tu bio (opcional)"
        rows="3"
        onChange={handleChange}
      />

      <button type="submit">Registrarse</button>

      <div className="login-link">
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
      </div>
    </form>
  );
};

export default RegisterForm;