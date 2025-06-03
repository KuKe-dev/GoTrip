// src/components/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import Map from "../components/map/map.jsx"
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
                    setUser(login);setIsLogged(login.res);setIsLoading(false);

            })

            const todasLasCookies = document.cookie;
console.log(todasLasCookies); 

    } , [])

    if (isLoading) {
        return <div className="home-container"><Sidebar/><Topbar /></div>;
    }

  return (
    <div className="home-container">
        <Sidebar/>
        <Topbar />
        <main className="main-content content-w-navbar">
          {isLogged === "false" ? 
          <dialog open className="not-logged-welcome">Bienvenido a goTrip! Para crear tu diario de aventuras, debes iniciar sesión. Tambien puedes explorar el mapa <nav className="not-logged-welcome buttons"><button onClick={() => window.location.href = "/login"}>Iniciar sesión</button><button onClick={() => window.location.pathname = "/explore"}>Explorar &quot;trips&quot; publicos</button><button onClick={() => document.getElementsByClassName("not-logged-welcome")[0].close()}>Cerrar advertencia</button></nav></dialog>
          : null}
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