import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./Discover.css";
import { useRef, useState, useEffect } from "react";
import BookScroll from "../../Components/BookScroll/BookScroll.jsx";
import axios from "axios";
const Discover = ({ LoggedIn }) => {
  const [BooksDetails, setBooksDetails] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      try {
        // console.log("discover", LoggedIn);
        let response;
        if (LoggedIn) {
          const token = localStorage.getItem("authToken");
          if (!token) {
            return;
          }
          response = await axios.get("http://localhost:5001/api/dashboard/personalized/", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        }
        else {
          response = await axios.get("http://localhost:5001/api/dashboard/");
        }
        setBooksDetails(response.data.filter((genre) => genre.books.length !== 0));
        // console.log(response.data);

      } catch (err) {
        console.log(err.message);
      }
    }
    getBooks();
  }, [LoggedIn])
  // useEffect(() => {
  //   console.log(BooksDetails);
  // }, [BooksDetails])

  return (
    <>
      gg
      gg
      <div className="search-bar-area">
        <button className="search-button">search</button>
      </div>
      {
        BooksDetails.map((genre) => {
          return (
            <BookScroll key={genre.title} Title={genre.title} PreBooks={genre.books} />
          );
        })
      }

    </>
  )
}

export default Discover


