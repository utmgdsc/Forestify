import logo from './logo.svg';
import './App.css';
import { LoginSignup } from './components/LoginSignup/LoginSignup';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000/',
});

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div >
      <LoginSignup />
    </div>
  );
}

export default App;
