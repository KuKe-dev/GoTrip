import Navbar from "../navbar/Navbar.jsx"; 
import "../navbar/Navbar.css";
import { useState, useEffect } from "react";

import { getCookie, checkIsLogged } from "../../scripts/logged.js";
import Sidebar from "../sidebar/Sidebar.jsx";
import "../sidebar/Sidebar.css";
import "./Profile.css";

export default function Profile() {
    const [isLogged, setIsLogged] = useState(null);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState(null);


    useEffect(() => {
        const token = getCookie('isLogged');
        checkIsLogged(token)
            .then(res => res.json())
            .then(login => {   
                if (login.res === "false") {
                    setTimeout(() =>window.location.href = "/" , 300)
                } else {
                    setUserId(login.id);
                    setTimeout(() => setIsLogged(login.res), 200);
                    fetch(`http://localhost:8080/api/profile/${login.id}`)
                        .then(res => {return res.json()})
                        .then(data => {
                            setProfile(data);
                            console.log(data);
                        })
                }
            })
            
    } , [])

    useEffect(() => {
        fetch(`http://localhost:8080/api/posts/user/${userId}`)
            .then(res => {return res.json()})
            .then(data => {
                console.log(data)
                setPosts(data)
            })


    }, [userId])

    function deletePost(id) {
   
    fetch(`http://localhost:8080/api/posts/${id}`, {
      method: 'DELETE',
      
    })
      window.location.reload()
    
  }


    if (!isLogged) {
    return (
        <>
            <Sidebar/>
            <main className="content-w-navbar">
                <h1 className="loading">Loading...</h1>
            </main>
        </>
)}

        return (
            <>
                <Sidebar/>
                <main className="content-w-navbar">
                    {profile && (
                        <>
                        <div class="profile-container">
                            <div class="profile-header">
                            <h1 class="profile-title">{profile.username}</h1>
                            <img class="profile-avatar" src={"http://localhost:8080/api/profile/img/" + profile.avatar} alt={profile.avatar} width={"400px"}/>
                            </div>
                            <div class="profile-info">
                                <div class="profile-field">
                                    <span class="profile-label">Biografía</span>
                                    <span class="profile-value">{profile.bio}</span>
                                </div>
                                <div class="profile-field">
                                    <span class="profile-label">Miembro desde</span>
                                    <span class="profile-value">{profile.createdAt}</span>
                                </div>                
                            </div>
                        </div>
                        
                            <div class="posts-section">
                                <h1 class="posts-title">Mis Publicaciones</h1>
                                <div class="posts-grid">
                                {posts && posts.map(post => (
                                    <div class="post-card">
                                        <h3 class="post-author">@You</h3>
                                        <img src={`http://localhost:8080/api/posts/img/${post.img}`} alt="Post image" class="post-image"></img>
                                        <p class="post-description">{post.description}</p>
                                        <button class="delete-btn" onClick={(e) => {e.preventDefault; deletePost(post.id)}}>Delete</button>
                                    </div>
                                
                                ))}
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </>
        );
    
}