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
import BookPage from "./Components/BookPage/BookPage.jsx";

const App = () => {
  const [ShowAuth, setShowAuth] = useState(false);
  const onShowAuth=()=>{
    setShowAuth(prev=>!prev);
  }
  const [LoggedIn, setLoggedIn] = useState(true);
  return (
    <>
      <Navbar ShowAuth={onShowAuth} LoggedIn={LoggedIn}/>
      {ShowAuth && <Signup ShowAuth={onShowAuth} setLoggedIn={setLoggedIn}/>}
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/library" element={<Library LoggedIn={LoggedIn}/>} />
        <Route path="/wishlist" element={<Wishlist LoggedIn={LoggedIn}/>} />
        <Route path="/cart" element={<Cart LoggedIn={LoggedIn}/>} />
        <Route path="/profile" element={<Profile LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path="/:Source/:BookId" element={<BookPage LoggedIn={LoggedIn} onShowAuth={onShowAuth}/>}/>
      </Routes>
    </>
  )
}

export default App