
import { useEffect, useState } from "react";
import Map from "../components/map/Map";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";
import { FaRedo } from "react-icons/fa";

import './Explore.css'

export default function Explore() {
    const [randomPosts, setRandomPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/posts/randoms", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setRandomPosts(data);
            } catch (error) {
                console.error('Error fetching random posts:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container">
            <Sidebar />
            <Topbar />
            <main className="main-content content-w-navbar">
                {error && (
                    <div className="error-message">
                        Error loading posts: {error}
                    </div>
                )}
                <Map 
                    position={null}
                    zoom={null}
                    scroll={null}
                    user={{id: null, username: null, avatar: null}}
                    randomPosts={randomPosts}
                />
                <FaRedo className="reload-icon" onClick={() => window.location.reload()}/>
                <div className="explore-explanation-msg">
                    ¡Explorar los recuerdos de otros viajeros! Para ver otros viajes haz click en el boton de recargar <FaRedo />
                </div>
            </main>
        </div>
    );
}