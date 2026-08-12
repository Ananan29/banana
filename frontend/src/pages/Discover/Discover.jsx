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
        const response = await axios.get("https://blue-coleman-assumptions-blocks.trycloudflare.com/api/dashboard/");
        setBooksDetails(response.data.filter((genre) => genre.books.length!==0));
      } catch (err) {
        console.log(err);
      }
    }
    getBooks();
  }, [])
  useEffect(() => {
    console.log(BooksDetails);
  }, [BooksDetails])
  
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
            <BookScroll key={genre.title} Title={genre.title} PreBooks={genre.books}/>
          );
        })
      }

    </>
  )
}

export default Discover


