// src/components/sidebar/Sidebar.jsx
import React, { useState } from "react";
import { FaUser, FaPlusCircle, FaNewspaper, FaMapMarkedAlt, FaShieldAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/logo-gotrip.png";
import NewsPopup from "../news/NewsPopup";
const Sidebar = () => {
  const [showNews, setShowNews] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Vacía datos del usuario
    navigate("/login");   // Redirige al login
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="GoTrip Logo" />
      </div>

      <ul className="menu">
        <li>
          <Link to="/profile" className="menu-link">
            <FaUser className="icon" /> Perfil
          </Link>
        </li>
        <li>
          <Link to="/home" className="menu-link">
            <FaMapMarkedAlt className="icon" /> Inicio
          </Link>
        </li>
        <li>
          <Link to="/createPost" className="menu-link">
            <FaPlusCircle className="icon" /> Nueva Publicación
          </Link>
        </li>

        <li onClick={() => setShowNews(!showNews)}>
          <FaNewspaper className="icon" /> Noticias
        </li>       
        <li>
          <Link to="/privacy" className="menu-link">
            <FaShieldAlt className="icon" /> Privacidad
          </Link>
        </li>

        <li><FaCog className="icon" /> Configuración</li>

        <li onClick={handleLogout} className="menu-link" style={{ cursor: "pointer" }}>
        <FaSignOutAlt className="icon" /> Cerrar sesión
        </li>

      </ul>

      {showNews && <NewsPopup onClose={() => setShowNews(false)} />}
    </div>
  );
};

export default Sidebar;