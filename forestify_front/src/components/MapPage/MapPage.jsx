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
import * as reactIcons from "react-icons/gr";
import * as aiIcons from "react-icons/ai";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { SidebarData } from './SidebarData';
import test from '../Assets/test.png'



export const MapPage = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (

    <>
      <div className="navbar"> 
      <Link to="#" className='menu-bars'>
        <reactIcons.GrMapLocation onClick={showSidebar}/>
      </Link>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className='nav-menu-items' onClick={showSidebar}>

          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </div>
      <img src={test} height={1500} width={2300}></img>
    </>
    
    
  )
}
