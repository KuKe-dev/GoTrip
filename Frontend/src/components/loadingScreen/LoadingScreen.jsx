import React, { useState, useEffect } from 'react';

import './LoadingScreen.css';

const LoadingScreen = ({ message = "Cargando..." }) => {
  const [showServerMessage, setShowServerMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowServerMessage(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* Logo placeholder - puedes reemplazar con tu logo */}
        <div className="loading-logo">
          <div className="logo-placeholder">GoTrip</div>
        </div>
        
        {/* Spinner animado */}
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
        </div>
        
        {/* Mensaje de carga */}
        <div className="loading-message">
          {message}
        </div>
        
        {/* Mensaje de servidores (aparece después de 1 segundo) */}
        {showServerMessage && (
          <div className="server-message">
            Los servidores se están iniciando.<br/>
            Puede tardar entre 15 y 20 segundos.
          </div>
        )}
        
        {/* Puntos animados */}
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
);
};

export default LoadingScreen;