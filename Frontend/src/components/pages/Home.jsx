// src/components/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import Map from "../map/Map";
import "../styles/Home.css";
import { getCookie, checkIsLogged } from "../../scripts/logged";

const Home = () => {

  const [isLogged, setIsLogged] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getCookie('isLogged');
        checkIsLogged(token).then(res => res.json())
            .then(login => {
                if (login.res === "false") {
                    window.location.href = "/"
                }
                else {
                  console.log(login)
                    setUser(login);setIsLogged(login.res);setIsLoading(false);
                }
            })

    } , [])

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="map-wrapper">
          {isLoading ? (
                    <div>Cargando...</div> 
                ) : (
                    <Map
                        position={null}
                        zoom={null}
                        scroll={null}
                        user={user}
                    />
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
