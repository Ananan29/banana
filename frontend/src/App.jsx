import React from "react"
import { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover/Discover.jsx";
import Library from "./pages/Library/Library.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Profile from "./pages/Profile/Profile.jsx";

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const onSignupClick=()=>{
    setShowSignup(prev=>!prev);
  }
  const [LoggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <Navbar Signupclick={onSignupClick} LoggedIn={LoggedIn}/>
      {showSignup && <Signup Signupclick={onSignupClick} setLoggedIn={setLoggedIn}/>}
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/library" element={<Library />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App