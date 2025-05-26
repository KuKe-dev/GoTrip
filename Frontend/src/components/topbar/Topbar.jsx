// src/components/topbar/Topbar.jsx
import React, { useState } from "react";
import { FaComments, FaBell, FaUser, FaSearch } from 'react-icons/fa';
import './Topbar.css';
import ChatPopup from '../chat/ChatPopup';


const Topbar = () => {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="topbar-container">
      {/* BUSCADOR TIPO GOOGLE */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar en GoTrip..."
          className="search-input"
        />
      </div>

      {/* ICONOS A LA DERECHA */}
      <div className="topbar-icons">
        <button className="icon-btn" onClick={() => setShowChat(!showChat)}><FaComments /></button>
        <button className="icon-btn"><FaBell /></button>
        <button className="user-btn"><FaUser /></button>
      </div>
      {showChat && <ChatPopup onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default Topbar;
