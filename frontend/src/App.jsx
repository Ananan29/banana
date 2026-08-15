import React from "react"
import { useState, useEffect,useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Discover from "./pages/Discover/Discover.jsx";
import Library from "./pages/Library/Library.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import BookPage from "./pages/BookPage/BookPage.jsx";
import SeriesPage from "./pages/SeriesPage/SeriesPage.jsx";
import AuthorPage from "./pages/AuthorPage/AuthorPage.jsx";
import OpenBookPage from "./pages/OpenBookPage/OpenBookPage.jsx";
import PaymentPage from "./pages/Payment/Payment.jsx";
import axios from "axios";
const App = () => {
  const location = useLocation();
  const [ShowAuth, setShowAuth] = useState(false);
  const [ShowNavBar, setShowNavBar] = useState(true);
  const [LoggedIn, setLoggedIn] = useState(false);
  const onShowAuth = () => {
    setShowAuth(prev => !prev);
  }
  const onShowNavBar = useCallback((show) => {
    setShowNavBar(show);
  }, []);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoggedIn(false); 
        return;
      }
      try {
        const response = await axios("http://localhost:5001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setLoggedIn(true);
      } catch (err) {
        if (err.response?.status == 401) localStorage.removeItem("authToken");
        setLoggedIn(false); 
      }
    }
    checkAuth();
  }, [])

  useEffect(() => {
    const detailRoutes = ["/profile", "/library", "/wishlist", "/cart"]; 
    const isDetailPage = detailRoutes.includes(location.pathname) ||
      location.pathname.startsWith("/book/") ||
      location.pathname.startsWith("/series/") ||
      location.pathname.startsWith("/author/");

    document.body.style.background = isDetailPage ? "#fafafa" : "#ffffff";

    if (!location.pathname.startsWith("/readbook")) {
      setShowNavBar(true);
    }

    return () => {
      document.body.style.background = "";
    };
  }, [location.pathname]);


  return (
    <>
      {ShowNavBar && <Navbar ShowAuth={onShowAuth} LoggedIn={LoggedIn} />}
      {ShowAuth && <Signup ShowAuth={onShowAuth} setLoggedIn={setLoggedIn} />}
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover LoggedIn={LoggedIn} />} />
        <Route path="/library" element={<Library LoggedIn={LoggedIn} />} />
        <Route path="/wishlist" element={<Wishlist LoggedIn={LoggedIn} />} />
        <Route path="/cart" element={<Cart LoggedIn={LoggedIn} />} />
        <Route path="/profile" element={<Profile LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/book/:BookId" element={<BookPage LoggedIn={LoggedIn} onShowAuth={onShowAuth} />} />
        <Route path="/series/:SeriesId" element={<SeriesPage />} />
        <Route path="/author/:AuthorId" element={<AuthorPage />} />
        <Route path="readbook/:BookId" element={<OpenBookPage onShowNavBar={onShowNavBar} />} />
        <Route path="/payment" element={<PaymentPage LoggedIn={LoggedIn} />} />
      </Routes>
    </>
  )
}

export default App