import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Asegúrate de tener axios instalado (npm install axios)
import Navbar from "../navbar/Navbar.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import "../navbar/Navbar.css";
import "../sidebar/Sidebar.css";
import "./Privacy.css";
import Swal from 'sweetalert2';

export default function Privacy() {
  const navigate = useNavigate();

  const handleSaveClick = () => {
    navigate("/home");
  };

  const handleDeleteAccount = async () => {
     const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar cuenta',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('isLogged='))
          ?.split('=')[1];

        const response = await fetch("http://localhost:8080/api/auth/delete-account", {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          document.cookie = "isLogged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          await Swal.fire('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente.', 'success');
          navigate("/Register");
            
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message || "Falló la eliminación"}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión");
      }
    }
  };

  return (
    <div className="privacy-page">
      <Sidebar />
      <div className="privacy-section">
        <h1 className="privacy-title">Configuración de Privacidad</h1>
        <div className="privacy-card">
          {/* Opciones de privacidad */}
          <div className="privacy-option">
            <label>¿Quién puede ver tu perfil?</label>
            <select>
              <option>Público</option>
              <option>Solo amigos</option>
              <option>Privado</option>
            </select>
          </div>

          <div className="privacy-option">
            <label>¿Quién puede comentar en tus publicaciones?</label>
            <select>
              <option>Todos</option>
              <option>Solo seguidores</option>
              <option>Nadie</option>
            </select>
          </div>

          <div className="privacy-option">
            <label>Solicitudes de seguimiento</label>
            <select>
              <option>Aceptación manual</option>
              <option>Aceptar automáticamente</option>
            </select>
          </div>

          <button className="save-btn" onClick={handleSaveClick}>
            Guardar configuración
          </button>
        </div>

        {/* Botón de eliminar cuenta */}
        <div className="privacy-option danger">
          <button onClick={handleDeleteAccount}>Eliminar cuenta</button>
        </div>
      </div>
    </div>
  );
}