// src/components/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Map from "../components/map/Map";
import "./Home.css";
import { getCookie, checkIsLogged } from "../scripts/logged";

export default function Home() {

  const [isLogged, setIsLogged] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getCookie('isLogged');
        checkIsLogged(token).then(res => res.json())
            .then(login => {
                if (login.res === "false") {
                    window.location.href = "/login";
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
        <Topbar />
        <main className="main-content content-w-navbar">
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
        </main>
    </div>
  );
};