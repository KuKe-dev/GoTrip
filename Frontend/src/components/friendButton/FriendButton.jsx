import { useState, useEffect } from "react";
import { getCookie, checkIsLogged } from "../../scripts/logged.js";
import "./FriendButton.css";

export default function FriendButton({ targetUserId, targetUsername, className = "" }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const token = getCookie('isLogged');
                const loginResponse = await checkIsLogged(token);
                const loginData = await loginResponse.json();
                
                if (loginData.res === "false") {
                    setError("No estás autenticado");
                    return;
                }
                
                setCurrentUserId(loginData.id);
                
                // No mostrar botón si es el mismo usuario
                if (loginData.id === targetUserId) {
                    setLoading(false);
                    return;
                }
                
                // Verificar si ya sigue al usuario
                const followResponse = await fetch(`http://localhost:8080/api/isFollowing?followerId=${loginData.id}&followingId=${targetUserId}`);
                console.log(followResponse);
                if (followResponse.ok) {
                    const followData = await followResponse.json();
                    console.log(followData);
                    setIsFollowing(followData.isFollowing);
                } else {
                    console.error("Error checking follow status");
                }
                
            } catch (err) {
                console.error("Error checking follow status:", err);
                setError("Error al verificar estado de seguimiento");
            } finally {
                setLoading(false);
            }
        };
        
        if (targetUserId) {
            checkFollowStatus();
        }
    }, [targetUserId]);

    const handleFollowToggle = async () => {
        if (actionLoading || currentUserId === targetUserId) return;
        
        setActionLoading(true);
        setError(null);
        
        try {
            const endpoint = isFollowing 
                ? `http://localhost:8080/api/unfollow?followerId=${currentUserId}&followingId=${targetUserId}`
                : `http://localhost:8080/api/follow?followerId=${currentUserId}&followingId=${targetUserId}`;
            
            const response = await fetch(endpoint, {
                method: isFollowing ? 'DELETE' : 'POST',
                
            });
            
            if (response.ok) {
                setIsFollowing(!isFollowing);
                
                // Mostrar mensaje de éxito (opcional)
                const message = isFollowing 
                    ? `Has dejado de seguir a ${targetUsername}`
                    : `Ahora sigues a ${targetUsername}`;
                console.log(message);
                
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al procesar la solicitud');
            }
            
        } catch (err) {
            console.error("Error toggling follow:", err);
            setError(err.message || "Error al procesar la solicitud");
        } finally {
            setActionLoading(false);
        }
    };

    // No mostrar nada si es el mismo usuario o está cargando inicialmente
    if (loading || currentUserId === targetUserId) {
        return null;
    }

    // Mostrar error si existe
    if (error) {
        return <span className="follow-error">{error}</span>;
    }

    return (
        <button 
            className={`follow-button ${isFollowing ? 'following' : 'not-following'} ${className}`}
            onClick={handleFollowToggle}
            disabled={actionLoading}
        >
            {actionLoading ? (
                <span className="loading-spinner"></span>
            ) : (
                <>
                    {isFollowing ? (
                        <>
                            <span className="follow-icon">✓</span>
                            <span className="follow-text">Siguiendo</span>
                            <span className="unfollow-text">Dejar de seguir</span>
                        </>
                    ) : (
                        <>
                            <span className="follow-icon">+</span>
                            <span className="follow-text">Seguir</span>
                        </>
                    )}
                </>
            )}
        </button>
    );
}