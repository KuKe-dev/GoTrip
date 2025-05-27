import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/pages/Home.jsx'
import CreatePost from './components/pages/CreatePost.jsx'
import RegisterPage from './components/pages/RegisterPage.jsx'
import LoginPage from './components/pages/LoginPage.jsx';
import Privacy from "./components/pages/Privacy.jsx"; 
import Profile from "./components/pages/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/h" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/privacy" element={<Privacy />} />
        
        {/* Ruta para perfil propio */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Ruta para perfiles de otros usuarios */}
        <Route path="/user/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;