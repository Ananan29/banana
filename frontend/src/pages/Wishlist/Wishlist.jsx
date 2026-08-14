import React, { useState, useEffect } from "react";
import BookDetails from "./../../data/books.js";
import BookCard from "./../../Components/BookCard/BookCard.jsx";
import "./Wishlist.css";
import axios from "axios";
const Wishlist = ({ LoggedIn }) => {
  const [WishlistBooks, setWishlistBooks] = useState(JSON.parse(localStorage.getItem("BooksInWishlist")) || []);
  const RemoveBook = (BookId) => {
    let books = WishlistBooks;
    books = books.filter(bookId => (bookId) !== BookId);
    localStorage.setItem("BooksInWishlist", JSON.stringify(books));
    window.location.reload();
  }
  const AddToCart = (BookId) => {
    console.log(BookId);
    const existingBooks = localStorage.getItem("BooksInCart");
    let cartBooks = JSON.parse(existingBooks);
    if (cartBooks === null) cartBooks = [];
    if (!cartBooks.includes(BookId)) {
      cartBooks.push(BookId);
      localStorage.setItem("BooksInCart", JSON.stringify(cartBooks));
    }
    RemoveBook(BookId);
  }
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const getWishlistBooks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          return;
        }
        const response = await axios.get(`${API_URL}/wishlist/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getWishlistBooks();
  }, [])
  return (
    <div>
      {!LoggedIn ? (
        <p>log in to access this feauture</p>
      ) : (
        <div className="wishlist-page">
          {
            WishlistBooks.length == 0 ? (
              <p>add books to wishlist</p>
            ) : (
              WishlistBooks.map(wishlistBooks => {
                const currBook = BookDetails.find(bookDetails => bookDetails.bookId === (wishlistBooks));
                console.log(currBook?.bookId);
                return (
                  <div key={wishlistBooks} className="wishlist-book-card">
                    <button className="wishlist-button" onClick={() => RemoveBook(currBook?.bookId)}>{"<3"}</button>
                    <BookCard BookId={currBook?.bookId} Source="wishlist" />
                  </div>
                )
              })
            )
          }
        </div>
      )}
    </div>
  )
}

export default Wishlist