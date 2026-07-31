import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ Signupclick }) => {
  return (
    <div>
        <nav>
            <Link to="/discover">Discover</Link>
            <Link to="/library">Library</Link>
            <button onClick={Signupclick}>Sign up</button>
        </nav>
    </div>
  )
}

export default Navbar