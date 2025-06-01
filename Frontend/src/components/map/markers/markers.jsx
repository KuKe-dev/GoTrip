import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import { useState, useEffect, useCallback } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';

export default function Markers(props) {
  const userId = props.user.id;
  const userName = props.user.username;
  const avatar = props.user.avatar;
  
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [friendsProfile, setFriendsProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingPost, setDeletingPost] = useState(null);


  const navigate = useNavigate();

  // Fetch user posts and friends
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const [postsRes, friendsRes] = await Promise.all([
          fetch(`http://localhost:8080/api/posts/user/${userId}`),
          fetch(`http://localhost:8080/api/followings/${userId}`)
        ]);

        const postsData = await postsRes.json();
        const friendsData = await friendsRes.json();

        setPosts(postsData || []);
        setFriends(friendsData || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setPosts([]);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Fetch friends posts and profiles
  useEffect(() => {
    const fetchFriendsData = async () => {
      if (friends && friends.length > 0) {
        try {
          const [postsArrays, profilesArrays] = await Promise.all([
            Promise.all(
              friends.map(friendId =>
                fetch(`http://localhost:8080/api/posts/user/${friendId}`)
                  .then(res => res.json())
                  .catch(() => [])
              )
            ),
            Promise.all(
              friends.map(friendId =>
                fetch(`http://localhost:8080/api/profile/${friendId}`)
                  .then(res => res.json())
                  .catch(() => null)
              )
            )
          ]);

          const allPosts = postsArrays.flat().filter(Boolean);
          const allProfiles = profilesArrays.filter(Boolean);

          setFriendsPosts(allPosts);
          setFriendsProfile(allProfiles);
        } catch (error) {
          console.error('Error fetching friends data:', error);
          setFriendsPosts([]);
          setFriendsProfile([]);
        }
      }
    };

    fetchFriendsData();
  }, [friends]);

  // Custom icons
  const customIcon = new Icon({
    iconUrl: "https://i.ibb.co/99s7s9j9/icono-Propio.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    className: 'custom-marker-own'
  });

  const customIconFriends = new Icon({
    iconUrl: "https://i.ibb.co/13rp2SY/icono-Amigo.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
    className: 'custom-marker-friend'
  });

  // Delete post function
  const deletePost = useCallback(async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      return;
    }

    try {
      setDeletingPost(id);
      const response = await fetch(`http://localhost:8080/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      } else {
        throw new Error('Error al eliminar el post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar el post. Intenta nuevamente.');
    } finally {
      setDeletingPost(null);
    }
  }, []);

  // Helper function to get friend's profile by userId
  const getFriendProfile = useCallback((userId) => {
    return friendsProfile?.find(profile => parseInt(profile.id) === parseInt(userId));
  }, [friendsProfile]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return null; // Or a loading spinner if needed
  }

  return (
    <>
      {/* User's own posts */}
      {posts.map(post => (
        <Marker key={`user-${post.id}`} position={[post.latitude, post.longitude]} icon={customIcon}>
          <Popup className='custom-popup own-post' closeButton={true}>
            <div className="popup-content">
              <div className="popup-header" onClick={() => navigate(`/user/${userName}`)}>
                <div className="user-info">
                  <div className="user-details">
                    <span className="post-badge own-badge">Tu post</span>
                  </div>
                </div>
                {post.createdAt && (
                  <span className="post-date">{formatDate(post.createdAt)}</span>
                )}
              </div>

              {post.img && (
                <div className="image-container">
                  <img 
                    className='post-image' 
                    src={`http://localhost:8080/api/posts/img/${post.img}`} 
                    alt="Post"
                    loading="lazy"
                    onError={(e) => {
                      e.target.parentElement.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {post.description && (
                <div className="post-description">
                  <p>{post.description}</p>
                </div>
              )}

              <div className="popup-actions">
                <button 
                  className="delete-btn"
                  onClick={() => deletePost(post.id)}
                  disabled={deletingPost === post.id}
                  aria-label="Eliminar post"
                >
                  {deletingPost === post.id ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                      Eliminar
                    </>
                  )}
                </button>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Friends' posts */}
      {friendsPosts.map(post => {
        const friendProfile = getFriendProfile(post.userId);
        
        return (
          <Marker key={`friend-${post.id}`} position={[post.latitude, post.longitude]} icon={customIconFriends}>
            <Popup className='custom-popup friend-post' closeButton={true}>
              <div className="popup-content">
                <div className="popup-header" onClick={() => navigate(`/user/${friendProfile?.username}`)}>
                  <div className="user-info">
                    {friendProfile?.avatar && (
                      <img 
                        className='user-avatar' 
                        src={`http://localhost:8080/api/profile/img/${friendProfile.avatar}`} 
                        alt={`Perfil de ${friendProfile.username}`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="user-details">
                      <h3 className="username">
                        @{friendProfile?.username || 'Usuario'}
                      </h3>
                      <span className="post-badge friend-badge">Amigo</span>
                    </div>
                  </div>
                  {post.createdAt && (
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                  )}
                </div>

                {post.img && (
                  <div className="image-container">
                    <img 
                      className='post-image' 
                      src={`http://localhost:8080/api/posts/img/${post.img}`} 
                      alt="Post de amigo"
                      loading="lazy"
                      onError={(e) => {
                        e.target.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {post.description && (
                  <div className="post-description">
                    <p>{post.description}</p>
                  </div>
                )}

                <div className="popup-actions">
                  <button 
                    className="like-btn"
                    aria-label="Me gusta"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Me gusta
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}