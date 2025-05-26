import 'leaflet/dist/leaflet.css'
import {Marker, Popup} from 'react-leaflet'
import { Icon } from 'leaflet';
import { useState, useEffect, use } from 'react';

import './style.css'

export default function Markers(props) {

  const userId = props.user.id;
  const userName = props.user.username;
  const avatar = props.user.avatar;
  // * Get Posts data
  const [posts, setPosts] = useState(null)
  const [friends, setFriends] = useState(null)
  const [friendsPosts, setFriendsPosts] = useState(null)
  const [friendsProfile, setFriendsProfile] = useState(null)

  useEffect(() => {
      fetch(`http://localhost:8080/api/posts/user/${userId}`)
        .then(res => {return res.json()})
        .then(data => {
          console.log(data)
          setPosts(data)
        })

      fetch(`http://localhost:8080/api/friends-clap-clap-clap-clap/${userId}`)
        .then(res => {return res.json()})
        .then(data => {
          console.log(data)
          setFriends(data)
        })

  }, [userId])



  useEffect(() => {
  if (friends && friends.length > 0) {
    Promise.all(
      friends.map(friendId =>
        fetch(`http://localhost:8080/api/posts/user/${friendId}`)
          .then(res => res.json()) 
      )
    ).then(postsArrays => {
      // Flatten array of arrays
      const allPosts = postsArrays.flat();
      setFriendsPosts(allPosts);
    });
    Promise.all(
      friends.map(friendId =>
        fetch(`http://localhost:8080/api/profile/${friendId}`)
          .then(res => res.json()) 
      )
    ).then(profilesArrays => {
      // Flatten array of arrays
      const allProfiles = profilesArrays.flat();
      setFriendsProfile(allProfiles);
      console.log(allProfiles)
    });
  }
}, [friends]);




  // * Custom Icon
  const customIcon = new Icon({
    iconUrl: "https://i.ibb.co/99s7s9j9/icono-Propio.png",
    iconSize: [30,30],
    iconAnchor: [15, 30]
  })

  const customIconFriends = new Icon({
    iconUrl: "https://i.ibb.co/13rp2SY/icono-Amigo.png",
    iconSize: [30,30],
    iconAnchor: [15, 30]
  })

  function deletePost(id) {
   
    fetch(`http://localhost:8080/api/posts/${id}`, {
      method: 'DELETE',
      
    })
      window.location.reload()
    
  }

  
  return (

    
    <>
      {posts && posts.map(post => (
        // eslint-disable-next-line react/jsx-key
        <Marker position={[post.latitude, post.longitude]} icon={customIcon}>
          <Popup className='popup'
            minWidth={200}  
            maxWidth={600}  
            closeButton={false} >
            <h3>@You</h3>
            {post.img && (
              <img className='imgPost' src={`http://localhost:8080/api/posts/img/${post.img}`} />
            )}
            <p>{post.description}</p>
            
            <button onClick={(e) => {e.preventDefault; deletePost(post.id)}}>Delete</button>
          </Popup>
        </Marker>
      ))}

      {friendsPosts && friendsPosts.map(post => {console.log(post);
        
        
        return(
        // eslint-disable-next-line react/jsx-key
        <Marker position={[post.latitude, post.longitude]} icon={customIconFriends}>
          <Popup className='popup'
            minWidth={200}  
            maxWidth={600}  
            closeButton={false} >
            <img className='imgProfile' src={friendsProfile && friendsProfile.map(profile => {if (parseInt(profile.id) === post.userId) {return `http://localhost:8080/api/profile/img/${profile.avatar}`}})[0]} style={{borderRadius: '50%', width: '50px', height: '50px'}}/>
            <h3>@{friendsProfile && friendsProfile.map(profile => {if (parseInt(profile.id) === post.userId) {return profile.username}})}</h3>
            {post.img && (
              <img className='imgPost' src={`http://localhost:8080/api/posts/img/${post.img}`} />
            )}
            <p>{post.description}</p>
            
            
          </Popup>
        </Marker>
        )
})}



    </>
  )
}