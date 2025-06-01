import Sidebar from "../components/sidebar/Sidebar.jsx";
import { useState, useEffect } from "react";
import { getCookie, checkIsLogged } from "../scripts/logged.js";
import './CreatePost.css';

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
            setTimeout(() => window.location.href = '/home', 1500);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setFeedback('Error: ' + error.message);
        }
    };

    useEffect(() => {
        const token = getCookie('isLogged');
        checkIsLogged(token)
            .then(res => res.json())
            .then(login => {
                if (login.res === "false") {
                    setTimeout(() =>window.location.href = "/" , 300)
                } else {
                    setUserId(login.id); setTimeout(() => setIsLogged(login.res), 200)
                }
            })
    }, []);

    return (
        <div className="create-post-page">
            <Sidebar />
            <div className="form-section">             
                <h1 className="title">Crear Publicación</h1>
                <form className="post-form" onSubmit={handleSubmit}>
                    <label>Imagen:
                        <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImageChange} required />
                    </label>
                    {preview && <img className="image-preview" src={preview} alt="Vista previa" />}

                    <label>Descripción:
                        <textarea id="descripcion" name="descripcion" required rows="3" />
                    </label>

                    <label>Latitud:
                        <input type="number" id="latitud" name="latitud" required step="any" placeholder="Ej: 40.7128" />
                    </label>

                    <label>Longitud:
                        <input type="number" id="longitud" name="longitud" required step="any" placeholder="Ej: -74.0060" />
                    </label>

                    <button type="submit" className="submit-btn">Publicar</button>
                    {feedback && <p className="feedback-msg">{feedback}</p>}
                </form>
            </div>
        </div>
    );
}
