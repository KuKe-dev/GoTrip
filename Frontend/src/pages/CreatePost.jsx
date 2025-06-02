import Sidebar from "../components/sidebar/Sidebar.jsx";
import { useState, useEffect } from "react";
import { getCookie, checkIsLogged } from "../scripts/logged.js";
import './CreatePost.css';
import Map from "../components/map/map.jsx";
import { FaImage } from "react-icons/fa";

export default function CreatePost() {
    const [isLogged, setIsLogged] = useState(null);
    const [userId, setUserId] = useState(null);
    const [preview, setPreview] = useState(null);
    const [feedback, setFeedback] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback("");

        if (isLogged === "false") {
            setFeedback("Debes iniciar sesion");
            return;
        }
        try {
            const formData = new FormData();
            const imageFile = document.getElementById('imagen').files[0];
            
            if (!imageFile) {
                throw new Error("Debes seleccionar una imagen");
            }

            formData.append('userId', userId);
            formData.append('image', imageFile);
            formData.append('description', document.getElementById('descripcion').value);
            formData.append('latitude', document.getElementById('latitud').value);
            formData.append('longitude', document.getElementById('longitud').value);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            setFeedback("¡Publicación creada exitosamente!");
            setTimeout(() => window.location.href = '/', 1500);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setFeedback('Error: ' + error.message);
        }
    };

    const handleMapClick = (lat, lng) => {

        document.getElementById('latitud').value = lat;
        document.getElementById('longitud').value = lng;
    };

    useEffect(() => {
        const token = getCookie('isLogged');
        checkIsLogged(token)
            .then(res => res.json())
            .then(login => {

                    setUserId(login.id); setTimeout(() => setIsLogged(login.res), 200)

            })
    }, []);

    return (
        <div className="create-post-page" style={{overflow: "hidden"}}>
            <Sidebar />
            {isLogged === "false" ? <dialog open className="not-logged-warning">Porfavor inicia sesion <button onClick={() => document.getElementsByClassName("not-logged-warning")[0].close()}>Cerrar advertencia</button></dialog> : null}
            <Map
                                        position={null}
                                        zoom={null}
                                        scroll={null}
                                        user={{ id: userId }}
                                        onMapClick={handleMapClick}
                                    />
            <div className="form-section">             
                <form className="post-form" onSubmit={handleSubmit}>
                    <h1 className="title">Crear Publicación</h1>
                    <label>Imagen:
                        <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImageChange} required />
                    </label>
                    {preview ? <img className="image-preview" src={preview} alt="Vista previa" /> : <div className="image-preview placeholder" alt="" ><FaImage className="placeholder-icon" /></div>}

                    <label>Descripción:
                        <textarea id="descripcion" name="descripcion" required rows="3" />
                    </label>
                    <p className="click-msg">Click en el mapa para seleccionar la ubicación</p>
                    <div className="location-inputs">
                        <label>Latitud:
                            <input type="number" id="latitud" name="latitud" required step="any" placeholder="Ej: 40.7128" />
                        </label>

                        <label>Longitud:
                            <input type="number" id="longitud" name="longitud" required step="any" placeholder="Ej: -74.0060" />
                        </label>
                    </div>

                    <button type="submit" className="submit-btn">Publicar</button>
                    {feedback && <p className="feedback-msg">{feedback}</p>}
                </form>
            </div>
        </div>
    );
}
