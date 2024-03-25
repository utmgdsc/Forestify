import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import { LoginSignup } from './components/LoginSignup/LoginSignup';
import {MapPage} from './components/MapPage/MapPage';
import {PageNavbar} from './components/PageNavbar/PageNavbar';
import axios from 'axios';
import AboutPage from './components/AboutPage/AboutPage';

const client = axios.create({
  baseURL: 'http://localhost:8000/',
});

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <PageNavbar/>
      <Routes>
        <Route path="/" element={ <MapPage/> } />
        <Route path="Login" element={ <LoginSignup/> } />
        <Route path="Profile" element={ <LoginSignup/> } />
        <Route path="About" element={ <AboutPage/> } />
      </Routes>
    </div>
  )
}
export default App;


