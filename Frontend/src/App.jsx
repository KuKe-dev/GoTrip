import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';

import './App.css'

/* Pages */
import Home from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Profile from './pages/Profile.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Explore from './pages/Explore.jsx';
import LoadingScreen from "./components/loadingScreen/LoadingScreen.jsx";
// import Config from './pages/Config.jsx';

function App() {

  return (
    <AuthProvider>
    <div className="App">
    <BrowserRouter>
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
    </BrowserRouter>
    </div>
    <div className="warning-responsive">
      Esta aplicación no tiene resposive design. Utiliza el navegador en modo escritorio o expande el ancho de tu navegador.
    </div>
    </AuthProvider>
  )
}

export default App;