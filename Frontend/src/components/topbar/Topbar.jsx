// src/components/topbar/Topbar.jsx
import React, { useState, useEffect } from "react";
import { FaComments, FaBell, FaUser, FaSearch } from 'react-icons/fa';
import './Topbar.css';
import debounce from 'lodash.debounce';// Para evitar llamadas excesivas a la API
import axios from 'axios';
import { getCookie } from "../../scripts/logged";


const Topbar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Opción 1: Filtrado local (sin API)
  /* useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers([]);
    } else {
      const results = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchTerm]); */

  // Función para buscar usuarios en la API de goTrip
  const fetchUsers = async (term) => {
  if (!term.trim()) {
    setUsers([]);
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`http://localhost:8080/api/users?searchTerm=${term}`);
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    const data = await response.json(); // Parsear la respuesta JSON
    setUsers(data);
  } catch (err) {
    setError('Error al cargar usuarios. Por favor, intenta nuevamente.');
    console.error('API Error:', err);
  } finally {
    setLoading(false);
  }
};

  // Debounce: espera 500ms después del último tecleo para llamar a la API
  const debouncedFetchUsers = debounce(fetchUsers, 100);

  // Efecto para ejecutar la búsqueda cuando searchTerm cambia
  useEffect(() => {
    fetchUsers(searchTerm);
    return () => debouncedFetchUsers.cancel(); // Limpia el debounce al desmontar
  }, [searchTerm]);


  return (
    <div className="topbar-container">
      {/* BUSCADOR TIPO GOOGLE */}
      <div className="search-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar en GoTrip..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <ul className="search-results">
        {users && users.length > 0 ? (
          users.map((user) => (
            <a href={`/user/${user.username}`} key={user.id} style={{textDecoration: 'none'}}>
            <li key={user.id}>
              <img src={`http://localhost:8080/api/profile/img/${user.avatar}`} alt="Avatar" className="avatar" style={{borderRadius: '50%', width: '50px', height: '50px'}}/>
              <span><strong>{user.username}</strong></span>
              
            </li>
            </a>
          ))
        ) : (
          searchTerm && !loading && <p>No se encontraron usuarios.</p>
        )}
        </ul>
      </div>

      {/* ICONOS A LA DERECHA */}
      <div className="topbar-icons">

        <button className="icon-btn"><FaBell /></button>
        <a href="/profile"><button className="user-btn"><FaUser /></button></a>
      </div>
    </div>
  );
};

export default Topbar;
