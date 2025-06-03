import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCookie, checkIsLogged } from "../scripts/logged.js";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import "./Profile.css";
import FriendButton from "../components/friendButton/FriendButton.jsx";
import Swal from 'sweetalert2';

export default function Profile() {
    const { username } = useParams(); // Obtener username de la URL
    const navigate = useNavigate(); // Para redireccionar
    const [isLogged, setIsLogged] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(null);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    const handleDeleteAccount = async () => {
        const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar cuenta',
        cancelButtonText: 'Cancelar'
      });
    
      if (result.isConfirmed) {
          try {
            const token = document.cookie
              .split('; ')
              .find(row => row.startsWith('isLogged='))
              ?.split('=')[1];
    
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/delete-account", {
              method: "DELETE",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            });
    
            if (response.ok) {
              document.cookie = "isLogged=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              await Swal.fire('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente.', 'success');
              navigate("/register");
                
            } else {
              const errorData = await response.json();
              alert(`Error: ${errorData.message || "Falló la eliminación"}`);
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión");
          }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie('isLogged');
                const loginResponse = await checkIsLogged(token);
                const loginData = await loginResponse.json();
                

                setIsLogged(loginData.res);
                loginData.id ? setCurrentUserId(loginData.id) : setCurrentUserId(null);
                
                
                // Obtener el username del usuario actual
                if (!loginData.id) return;
                const currentUserResponse = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/profile/${loginData.id}`);
                if (!currentUserResponse.ok) throw new Error('Failed to fetch current user data');
                const currentUserData = await currentUserResponse.json();
                setCurrentUsername(currentUserData.username);
                
                let profileUserId;
                
                // Si hay username en la URL, verificar si es el propio usuario
                if (username) {
                    // Si el username de la URL es igual al del usuario actual, redirigir a /profile
                    if (username === currentUserData.username) {
                        navigate('/profile', { replace: true });
                        return;
                    }
                    
                    const userResponse = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/profile/username/${username}`);
                    if (!userResponse.ok) {
                        throw new Error('Usuario no encontrado');
                    }
                    const userData = await userResponse.json();
                    profileUserId = userData.id;
                    
                    // Verificar si es el perfil propio (doble verificación)
                    setIsOwnProfile(loginData.id === userData.id);
                } else {
                    // Si no hay username, mostrar perfil propio
                    profileUserId = loginData.id;
                    setIsOwnProfile(true);
                }
                
                // Fetch profile data
                const profileResponse = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/profile/${profileUserId}`);
                if (!profileResponse.ok) throw new Error('Failed to fetch profile');
                const profileData = await profileResponse.json();
                setProfile(profileData);
                
                // Fetch user posts
                const postsResponse = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/posts/user/${profileUserId}`);
                if (!postsResponse.ok) throw new Error('Failed to fetch posts');
                const postsData = await postsResponse.json();
                setPosts(postsData || []);
                
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [username, navigate]); // Dependencias en username y navigate

    const deletePost = async (id) => {
        if (!isOwnProfile) return; // Solo permitir eliminar en perfil propio
        
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/posts/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) throw new Error('Failed to delete post');
            
            // Optimistic update - remove the post from state instead of reloading
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
            
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("No se pudo eliminar la publicación. Inténtalo de nuevo.");
        }
    };

    if (loading) {
        return (
            <>
                <Sidebar/>
                <main className="content-w-navbar">
                    <h1 className="loading">Loading profile data...</h1>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Sidebar/>
                <main className="content-w-navbar">
                    <h1 className="error">Error: {error}</h1>
                </main>
            </>
        );
    }

    return (
        <>
            <Sidebar/>
            <main className="content-w-navbar">
                {isLogged === "false" ? <dialog open className="not-logged-warning">Porfavor inicia sesion</dialog> : null}
                {profile && (
                    <>
                        <div className="profile-container">
                            <div className="profile-header">
                                <h1 className="profile-title">
                                    {profile.username}
                                    {isOwnProfile && <span className="own-profile-indicator"> (Tu perfil)</span>}
                                </h1>
                                
                                <img 
                                    className="profile-avatar" 
                                    src={import.meta.env.VITE_BACKEND_URL + `/api/profile/img/${profile.avatar}`} 
                                    alt={`Avatar de ${profile.username}`} 
                                    width="400px"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = '/default-avatar.png';
                                    }}
                                />
                                
                            </div>
                            {!isOwnProfile && <FriendButton targetUserId={profile.id} targetUsername={profile.username} />}
                            <div className="profile-info">
                                <div className="profile-field">
                                    <span className="profile-label">Biografía</span>
                                    <span className="profile-value">{profile.bio || "No hay biografía disponible"}</span>
                                </div>
                                <div className="profile-field">
                                    <span className="profile-label">Miembro desde</span>
                                    <span className="profile-value">
                                        {new Date(profile.createdAt).toLocaleDateString()}
                                    </span>
                                    
                                </div> 
                            </div>
                            {isOwnProfile && <div className="privacy-option danger profile">
                                <button onClick={handleDeleteAccount}>Eliminar cuenta</button>
                            </div>} 
                        </div>
                        
                        <div className="posts-section">
                            <h1 className="posts-title">
                                {isOwnProfile ? "Mis Publicaciones" : `Publicaciones de ${profile.username}`}
                            </h1>
                            <div className="posts-grid">
                                {posts.length > 0 ? (
                                    posts.map(post => (
                                        <div className="post-card" key={post.id}>
                                            <h3 className="post-author">
                                                @{isOwnProfile ? "You" : profile.username}
                                            </h3>
                                            <img 
                                                src={import.meta.env.VITE_BACKEND_URL + `/api/posts/img/${post.img}`} 
                                                alt="Post" 
                                                className="post-image"
                                                onError={(e) => {
                                                    e.target.onerror = null; 
                                                    e.target.src = '/default-post.png';
                                                }}
                                            />
                                            <p className="post-description">{post.description}</p>
                                            {isOwnProfile && (
                                                <button 
                                                    className="delete-btn" 
                                                    onClick={() => deletePost(post.id)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>
                                        {isOwnProfile 
                                            ? "No hay publicaciones aún" 
                                            : `${profile.username} no tiene publicaciones aún`
                                        }
                                    </p>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </>
    );
}