import React, { useState, useEffect } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import appLogo from '../Assets/logo.png';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import AboutPage from '../AboutPage/AboutPage'; // Corrected import
const client = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [action, setAction] = useState('Sign Up');
  const [currentUser, setCurrentUser] = useState(null);
  const [colour, setColour] = useState({ backgroundColor: '#eaeaea' });
  const navigate = useNavigate(); // Change history to navigate

  useEffect(() => {
    client.get("profile/").then(function (res) {
      setCurrentUser(true);
    }).catch(function (error) {
      setCurrentUser(false);
    });
  }, []);

  // Registers the user and logs them in
  function submitRegister(e) {
    e.preventDefault();
    client.post(
      "register/",
      {
        email: email,
        password: password,
        username: username
      }
    ).then(function (res) {
      setCurrentUser(true);
      navigate("/profile"); // Change history.push to navigate
    });
  }

  // Sends login request to the server
  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "login/",
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setCurrentUser(true);
      navigate("/profile"); // Change history.push to navigate
    });
  }

  // Logs the user out
  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "logout/",
      { withCredentials: true }
    ).then(function (res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      <div>
        <div className="center">
          <AboutPage />
        </div>
      </div>
    );
  }

  return (
    <div className='page'>
      <div className='logo'>
        <img src={appLogo} alt='logo' />
        <div className='logoText'>Forestify.ai</div>
      </div>
      <div className='container'>
        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        <Form>
          <div className='inputs'>
            {action === "Login" ? <div></div> : <div className='input'>
              <img src={user_icon} alt='name' />
              <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>}
            <div className='input'>
              <img src={email_icon} alt='email' />
              <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='input'>
              <img src={password_icon} alt='password' />
              <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Click Here</span></div>}
          <div className='submit-container'>
            <div className={action === "Login" ? "submit gray" : "submit"} onClick={(e) => { setAction("Sign Up") }}>Sign Up</div>
            <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={(e) => { setAction("Login") }}>Log In</div>
            <div
              onMouseEnter={() => { setColour({ backgroundColor: '#339900' }) }}
              onMouseLeave={() => { setColour({ backgroundColor: '#eaeaea' }) }}
              style={colour}
              className={action === "Sign Up" ? "submit" : "submit"}
              onClick={(e) => { action === "Sign Up" ? submitRegister(e) : submitLogin(e) }}>Submit
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
