// src/components/sidebar/Sidebar.jsx
import { FaUser, FaPlusCircle, FaMapMarkedAlt, FaCog, FaSignOutAlt, FaQuestion } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../scripts/logged";
import "./Sidebar.css";
import logo from "../../assets/logo-gotrip.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("isLogged"); // Vacía datos del usuario
    navigate("/login");   // Redirige al login
  };

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

        <li onClick={() => navigate("/profile")}>
            <FaUser className="icon" /> 
            <span>Perfil</span>
        </li>
        
        <li onClick={() => navigate("/createPost")}>

            <FaPlusCircle className="icon" /> 
            <span>Nueva Publicación</span>

        </li>    

        <li onClick={() => navigate("/settings")}>
          <FaCog className="icon" /> 
          <span>Configuración</span>
        </li>

        <li onClick={handleLogout} className="menu-link">
          <FaSignOutAlt className="icon" /> 
          <span>Cerrar sesión</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;