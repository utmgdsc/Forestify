import React, { useEffect } from 'react'
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import appLogo from '../Assets/logo.png'
import axios from 'axios'

export const LoginSignup = () => {

  const [action, setAction] = React.useState('Sign Up')
  
  //Calling the register endpoint
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/register/').then((response) => {
      console.log(response.data).catch((error) => {
        console.log(error)
      })
    })
  })

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
        
        <div className='inputs'>
        {action==="Login"?<div></div>:<div className='input'>
            <img src={user_icon} alt='name' />
            <input type='text' placeholder='Name' />
          </div>}
          <div className='input'>
            <img src={email_icon} alt='email' />
            <input type='email' placeholder='Email' />
          </div>
          <div className='input'>
            <img src={password_icon} alt='password' />
            <input type='password' placeholder='Password' />
          </div>
        </div>

        {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here</span></div>}


        <div className='submit-container'>
          <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
          <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}} >Log In</div>

        </div>
      </div>
    </div>
    
  )
}
