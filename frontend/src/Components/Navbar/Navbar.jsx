import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ Signupclick,LoggedIn }) => {
  return (
    <div>
        <nav>
            <Link to="/discover">Discover</Link>
            <Link to="/library">Library</Link>
            {!LoggedIn && <button onClick={Signupclick}>Sign up</button>}
            {LoggedIn &&
              <div>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/profile">Profile</Link>
              </div>
            }
        </nav>
    </div>
  )
}

export default Navbar