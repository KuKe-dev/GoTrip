import { useEffect } from 'react';
import './Navbar.css'

export default function Navbar() {

    useEffect(() => {
        const url = window.location.pathname;
        const navbar = document.getElementById('navbar');

        if (url == '/') {
            navbar.classList.add('startAnimNavbar');
        }
    })


    return (
        <nav id='navbar' className='navbar'>
            <a className='btn' href="/home">Home</a>
            <a className='btn' href="/createPost">Create New Post</a>
            <a className='btn' href="/">Log Out</a>
        </nav>
    )
}