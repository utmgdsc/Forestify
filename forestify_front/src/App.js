import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { LoginSignup } from './components/LoginSignup/LoginSignup';
import { MapPage } from './components/MapPage/MapPage';
import { PageNavbar } from './components/PageNavbar/PageNavbar';
import axios from 'axios';
import AboutPage from './components/AboutPage/AboutPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

const client = axios.create({
  baseURL: 'http://localhost:8000/',
});

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);
  console.log("USER", user);

  const handleLogin = (userData) => {
    console.log("USERDATA", userData);
    setUser(userData);
  };

  return (
    <div className="App">
      <PageNavbar/>
      <ToastContainer /> {/* Add ToastContainer here */}
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/login" element={<LoginSignup onLogin={handleLogin} />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="/profile" element={<ProfilePage user={user}/>} /> 
      </Routes>
    </div>
  );
};

export default App;
