import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "./../../assets/_ (3).jpeg";

const Navbar = ({ ShowAuth, LoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <nav>
        <div className="nav-left">
          <img
            src={logo}
            className="navbar-logo"
            alt="logo"
            onClick={() => navigate("/discover")}
          />
        </div>
        <div className="nav-center">
          <NavLink to="/discover">Discover</NavLink>
          <NavLink to="/library">Library</NavLink>
        </div>
        <div className="nav-right">
          {!LoggedIn ? (
            <button type="button" onClick={ShowAuth}>Sign up</button>
          ) : (
            <div className="navbar-loggedin-pages">
              <NavLink to="/wishlist">Wishlist</NavLink>
              <NavLink to="/cart">Cart</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
