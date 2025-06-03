import './App.css'
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Profile from './pages/Profile.jsx';
import CreatePost from './pages/CreatePost.jsx';
/* import Config from './pages/Config.jsx'; */
import Explore from './pages/Explore.jsx';

// import.meta.env.VITE_BACKEND_URL

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/explore" element={<Explore />} />
        {/* <Route path="/settings" element={<Config />} /> */}
      </Routes>
    </Router>
  )
}

export default App;