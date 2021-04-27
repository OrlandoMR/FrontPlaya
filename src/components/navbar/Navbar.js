import React from 'react';
import "./Navbar.css";
import {Link, NavLink} from "react-router-dom";

const Navbar = (props) => {
  return (<nav className="navbar">

    <Link className="navbar-brand" to="/">
      Umbrella
    </Link>
    <div className="sub-navbars">
      <div className="navbar-left">

        <NavLink activeClassName="active" className="navbar-item" exact="exact" to="/plan">
          Planes
        </NavLink>
      </div>

      <div className="navbar-rigth">
        <a className="navbar-item">
          Iniciar Sesión
        </a>
        <NavLink activeClassName="active" className="navbar-item" exact="exact" to="/registro">
          Registrarse
        </NavLink>
      </div>
    </div>
  </nav>)
}

export default Navbar
