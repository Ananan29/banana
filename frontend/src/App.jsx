import React from "react"
import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover/Discover.jsx";
import Library from "./pages/Library/Library.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const onSignupClick=()=>{
    setShowSignup(prev=>!prev);
  }
  return (
    <>
      <Navbar Signupclick={onSignupClick} />
      {showSignup && <Signup Signupclick={onSignupClick}/>}
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </>
  )
}

export default App