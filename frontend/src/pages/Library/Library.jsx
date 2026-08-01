import React from "react"
import Navbar from "../../components/Navbar/Navbar.jsx"
const Library = ({LoggedIn}) => {
  return (
    <div>
      Library
      {!LoggedIn && <p>log in to access features</p>}
    </div>
  )
}

export default Library