import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = ({ LoggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const logOutClicked = () => {
    localStorage.removeItem("authToken");
    setLoggedIn(false);
    navigate("/");
  };

  const [UserData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoggedIn(false);
          return;
        }

        const response = await axios.get("http://localhost:5001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData({
          name: response.data.name,
          email: response.data.email,
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (LoggedIn) {
      getUser();
    }
  }, [LoggedIn, setLoggedIn]);
  const [cart,setcart]=useState(0);
  const [wishlist,setwishlist]=useState(0);
useEffect(() => {
    const getCartBooks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          return;
        }
        const response = await axios.get(`${API_URL}/library/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const sections = Array.isArray(response.data) ? response.data : [];
        const countBooks = (title) => {
          const section = sections.find((item) => item.title === title);
          if (!section?.books) return 0;
          return Array.isArray(section.books) ? section.books.length : 1;
        };
        setcart(countBooks("owned") + countBooks("Continue-Reading") + countBooks("completed"));
        const response2 = await axios.get(`${API_URL}/wishlist/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response2.data);
        setwishlist(response2.data.length);
      } catch (err) {
        console.log(err.message);
      }
    }
    getCartBooks();
  }, [])
  return (
    <div className="profile-page">
      {!LoggedIn ? (
        <div className="profile-container profile-empty">
          <div className="profile-empty-card">
            <div className="profile-empty-icon">👤</div>
            <span className="profile-eyebrow">Account</span>
            <h1>Profile</h1>
            <p>Log in to access your account details and reading library.</p>
          </div>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <div>
              <span className="profile-eyebrow">Account</span>
              <h1>Profile</h1>
            </div>
            <button type="button" className="logout-btn" onClick={logOutClicked}>
              Log out
            </button>
          </div>

          <div className="profile-content">
            <aside className="profile-sidebar">
              <div className="profile-avatar">
                {UserData.name ? UserData.name.charAt(0).toUpperCase() : "U"}
              </div>
              <h2>{UserData.name || "User"}</h2>
              <p className="profile-email">{UserData.email}</p>

              <div className="profile-badges">
                <span className="profile-badge">Reader</span>
              </div>
            </aside>

            <div className="profile-info">
              <section className="profile-panel">
                <h3>Account details</h3>
                <div className="profile-row">
                  <span>Name</span>
                  <p>{UserData.name}</p>
                </div>
                <div className="profile-row">
                  <span>Email</span>
                  <p>{UserData.email}</p>
                </div>
              </section>

              <section className="profile-panel">
                <h3>Quick stats</h3>
                <div className="profile-stat-grid">
                  <div className="profile-stat" onClick={()=>navigate("/library")}>
                    <strong>{cart}</strong>
                    <span>Owned books</span>
                  </div>
                  <div className="profile-stat" onClick={()=>navigate("/wishlist")}>
                    <strong>{wishlist}</strong>
                    <span>Wishlist</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;