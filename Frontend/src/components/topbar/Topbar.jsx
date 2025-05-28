// src/components/topbar/Topbar.jsx
import React, { useState, useEffect } from "react";
import { FaUsers, FaBell, FaUser, FaSearch } from 'react-icons/fa';
import './Topbar.css';
import debounce from 'lodash.debounce';// Para evitar llamadas excesivas a la API
import axios from 'axios';
import { getCookie, checkIsLogged } from "../../scripts/logged";


const Topbar = () => {
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendsProfile, setFriendsProfile] = useState(null);
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





  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = getCookie('isLogged');
        const loginResponse = await checkIsLogged(token);
        const loginData = await loginResponse.json();
        setUserId(loginData.id);
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
      }
    };
    fetchUserId();
  }, []);


  useEffect(() => {
    fetch(`http://localhost:8080/api/followings/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFriends(data);
      });
  }, [userId]);

  useEffect(() => {
    if (friends && friends.length > 0) {
      Promise.all(
        friends.map(friendId =>
          fetch(`http://localhost:8080/api/profile/${friendId}`)
            .then(res => res.json()) 
        )
      ).then(profilesArrays => {
        const allProfiles = profilesArrays.flat();
        setFriendsProfile(allProfiles);
        console.log(allProfiles);
      });
    }
  }, [friends]);



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
        <details className="icon-btn">
          <summary className="btn-details"><FaUsers /></summary>
          
          <section className="user-list">
            <h3>Amigos</h3>
            <ul>
              {friendsProfile && friendsProfile.map((user) => (
                

                <a href={`/user/${user.username}`} key={user.id} style={{textDecoration: 'none'}}>
                <li key={user.id}>
                  <img src={`http://localhost:8080/api/profile/img/${user.avatar}`} alt="Avatar" className="avatar" style={{borderRadius: '50%', width: '50px', height: '50px'}}/>
                  <span><strong>{user.username}</strong></span>
                </li>
                </a>
              ))}
            </ul>
          </section>
        </details>
        <a href="/profile"><button className="user-btn"><FaUser /></button></a>
        
      </div>
    </div>
  );
};

export default Topbar;
