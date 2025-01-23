import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul className="home-ul">
        <li className="home-li">
          <Link to="/mainhome" className="active home-a">
            <h2>Home</h2>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/adduser" className="active home-a">
            <h2>Add User</h2>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/userdetails" className="active home-a">
            <h2>User Details</h2>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/contact" className="active home-a">
            <h2>ContactUs</h2>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/sendpdf" className="active home-a">
            <h2>Send Pdf</h2>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/register" className="active home-a">
            <button>Register</button>
          </Link>
        </li>
        <li className="home-li">
          <Link to="/log" className="active home-a">
            <button>Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
