
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './PageNavbar.css'

import { Link } from "react-router-dom";


export const PageNavbar = () => {


  return (

    <div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">Forestify</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <a class="nav-link" href="/">Map Page <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="about">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="profile">Profile</a>
      </li>

    </ul>
    <ul class="navbar-nav form-inline my-2 my-lg-0">
      <li class="nav-item">
        <a class="nav-link" href="login">Login</a>
      </li>

    </ul>
  </div>
</nav>
    </div>
    
  )
}
export default PageNavbar;
 