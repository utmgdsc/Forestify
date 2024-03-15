import { useState, useEffect } from 'react';
import './MapPage.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import appLogo from '../Assets/logo.png'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";



import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const client = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const MapPage = () => {
  const gray = {backgroundColor: '#eaeaea'}
  const green = {backgroundColor: '#339900'}

  const [action, setAction] = useState('Sign Up')
  const [currentUser, setCurrentUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [register, setRegister] = useState(false)
  const [colour, setColour] = useState(gray)

  return (

    <div className='page'>
      <div className='logo'>
        <img src={appLogo} alt='logo' />
          <div>Forestify.ai</div>
      </div> 

      <div className='container'>
        <div className='header'>
          <div className='text'>{action}</div>
          <div className='underline'></div>
        </div>
        
        <Form>
        <div className='inputs'>
        {action==="Login"?<div></div>:<div className='input'>
            <img src={user_icon} alt='name' />
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUserName(e.target.value)} />
          </div>}
          <div className='input'>
            <img src={email_icon} alt='email' />
            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='input'>
            <img src={password_icon} alt='password' />
            <input type='password' placeholder='Password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div> 

        {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here</span></div>}

        <div className='submit-container'>
          <div className={action==="Login"?"submit gray":"submit"} onClick={(e)=>{setAction("Sign Up"); setRegister(true)}}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"} onClick={(e)=>{setAction("Login"); setRegister(false)}}>Log In</div>
        </div>
        </Form>
      </div>
    </div>
    
  )
}
