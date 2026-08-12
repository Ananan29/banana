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
import SeriesPage from "./Components/SeriesPage/SeriesPage.jsx";
import AuthorPage from "./Components/AuthorPage/AuthorPage.jsx";
import OpenBookPage from "./pages/OpenBookPage/OpenBookPage.jsx";
const App = () => {
  const [ShowAuth, setShowAuth] = useState(false);
  const [ShowNavBar, setShowNavBar] = useState(true);
  const onShowAuth=()=>{
    setShowAuth(prev=>!prev);
  }
  const onShowNavBar=(show)=>{
    setShowNavBar(show);
  }
  const [LoggedIn, setLoggedIn] = useState(true);
  return (
    <>
      {ShowNavBar && <Navbar ShowAuth={onShowAuth} LoggedIn={LoggedIn}/>}
      {ShowAuth && <Signup ShowAuth={onShowAuth} setLoggedIn={setLoggedIn}/>}
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover LoggedIn={LoggedIn}/>} />
        <Route path="/library" element={<Library LoggedIn={LoggedIn}/>} />
        <Route path="/wishlist" element={<Wishlist LoggedIn={LoggedIn}/>} />
        <Route path="/cart" element={<Cart LoggedIn={LoggedIn}/>} />
        <Route path="/profile" element={<Profile LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path="/book/:BookId" element={<BookPage LoggedIn={LoggedIn} onShowAuth={onShowAuth}/>}/>
        <Route path="/series/:SeriesId" element={<SeriesPage/>}/>
        <Route path="/author/:AuthorId" element={<AuthorPage/>}/>
        <Route path="readbook/:BookId" element={<OpenBookPage onShowNavBar={onShowNavBar}/>}/>
      </Routes>
    </>
  )
}

export default App