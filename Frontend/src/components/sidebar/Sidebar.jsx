/* eslint-disable react/prop-types */
// src/components/sidebar/Sidebar.jsx
import { FaUser, FaPlusCircle, FaMapMarkedAlt, FaSignOutAlt, FaQuestion, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../scripts/logged";
import "./Sidebar.css";
import logo from "../../assets/logo-gotrip.png";
import { useEffect, useState } from "react";
import { getCookie, checkIsLogged } from "../../scripts/logged";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    deleteCookie("isLogged"); // Vacía datos del usuario
    navigate("/login");   // Redirige al login
  };

  useEffect(() => {
    checkIsLogged().then(res => res.json())
        .then(login => {
                setIsLogged(login);setIsLoading(false);
        })
  }, [])
  console.log(isLogged);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="sidebar">
      <div className="logo-home" onClick={() => navigate("/")}>
        <img src={logo} alt="GoTrip Logo" />
      </div>

      <ul className="menu">

        <li onClick={() => navigate("/")}>
            <FaMapMarkedAlt className="icon" /> 
            <span>Inicio</span>
        </li>

        <li onClick={() => navigate("/explore")}>
            <FaQuestion className="icon" /> 
            <span>Explora</span>
        </li>

        { isLogged.res === "true" && <li onClick={() => navigate("/profile")}>
            <FaUser className="icon" /> 
            <span>Perfil</span>
        </li>}
        
        { isLogged.res === "true" && <li onClick={() => navigate("/createPost")}>
            <FaPlusCircle className="icon" /> 
            <span>Nueva Publicación</span>
        </li>}

        {isLogged.res === "true" ? 
        <li onClick={handleLogout} className="menu-link logout">
          <FaSignOutAlt className="icon" /> 
          <span>Cerrar sesión</span>
        </li> : 
        <li onClick={handleLogout} className="menu-link signin">
          <FaSignInAlt className="icon" /> 
          <span>Iniciar sesión</span>
        </li>}
      </ul>
    </div>
  );
};

export default Sidebar;