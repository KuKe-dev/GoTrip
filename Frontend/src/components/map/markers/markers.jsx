import 'leaflet/dist/leaflet.css'
import {Marker, Popup} from 'react-leaflet'
import { Icon } from 'leaflet';
import { useState, useEffect } from 'react';
import './style.css'

export default function Markers(props) {
  const userId = props.user.id;
  const userName = props.user.username;
  const avatar = props.user.avatar;
  
  const [posts, setPosts] = useState(null);
  const [friends, setFriends] = useState(null);
  const [friendsPosts, setFriendsPosts] = useState(null);
  const [friendsProfile, setFriendsProfile] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      });

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
          fetch(`http://localhost:8080/api/posts/user/${friendId}`)
            .then(res => res.json()) 
        )
      ).then(postsArrays => {
        const allPosts = postsArrays.flat();
        setFriendsPosts(allPosts);
      });
      
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

  const customIcon = new Icon({
    iconUrl: "https://i.ibb.co/99s7s9j9/icono-Propio.png",
    iconSize: [30,30],
    iconAnchor: [15, 30]
  });

  const customIconFriends = new Icon({
    iconUrl: "https://i.ibb.co/13rp2SY/icono-Amigo.png",
    iconSize: [30,30],
    iconAnchor: [15, 30]
  });

  function deletePost(id) {
    fetch(`http://localhost:8080/api/posts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      window.location.reload();
    });
  }

  // Helper function to get friend's profile by userId
  const getFriendProfile = (userId) => {
    return friendsProfile?.find(profile => parseInt(profile.id) === parseInt(userId));
  };

  return (
    <>
      {posts && posts.map(post => (
        <Marker key={`user-${post.id}`} position={[post.latitude, post.longitude]} icon={customIcon}>
          <Popup className='popup' minWidth={200} maxWidth={600} closeButton={false}>
            <h3>@You</h3>
            {post.img && (
              <img className='imgPost' src={`http://localhost:8080/api/posts/img/${post.img}`} alt="Post" />
            )}
            <p>{post.description}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </Popup>
        </Marker>
      ))}

      {friendsPosts && friendsPosts.map(post => {
        const friendProfile = getFriendProfile(post.userId);
        
        return (
          <Marker key={`friend-${post.id}`} position={[post.latitude, post.longitude]} icon={customIconFriends}>
            <Popup className='popup' minWidth={200} maxWidth={600} closeButton={false}>
              {friendProfile && (
                <>
                  <img 
                    className='imgProfile' 
                    src={`http://localhost:8080/api/profile/img/${friendProfile.avatar}`} 
                    alt="Profile"
                    style={{borderRadius: '50%', width: '50px', height: '50px'}}
                  />
                  <h3>@{friendProfile.username}</h3>
                </>
              )}
              {post.img && (
                <img className='imgPost' src={`http://localhost:8080/api/posts/img/${post.img}`} alt="Post" />
              )}
              <p>{post.description}</p>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}