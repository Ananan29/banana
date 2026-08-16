import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "./../../Components/BookCard/BookCard.jsx";
import "./Wishlist.css";
import axios from "axios";
const Wishlist = ({ LoggedIn }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [WishlistBooks, setWishlistBooks] = useState([]);
  const RemoveBook = async(bookId) => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          return;
        }
        await axios.delete(`${API_URL}/wishlist/${bookId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWishlistBooks(prev => prev.filter(book => String(book.bookId) !== String(bookId)));
      } catch (err) {
        console.log(err.message);
      }
  }

  const AddToCart = async (book) => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        await axios.post(`${API_URL}/cart/${book.bookId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWishlistBooks(prev => prev.filter(item => String(item.bookId) !== String(book.bookId)));
      } catch (err) {
        console.log(err.message);
      }
  }
  // const AddToCart = (BookId) => {
  //   // console.log(BookId);
  //   const existingBooks = localStorage.getItem("BooksInCart");
  //   let cartBooks = JSON.parse(existingBooks);
  //   if (cartBooks === null) cartBooks = [];
  //   if (!cartBooks.includes(BookId)) {
  //     cartBooks.push(BookId);
  //     localStorage.setItem("BooksInCart", JSON.stringify(cartBooks));
  //   }
  //   RemoveBook(BookId);
  // }
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
        setWishlistBooks(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getWishlistBooks();
  }, [])
  return (
    <div className="page-shell">
      <h1 className="page-heading">Wishlist</h1>
      <p className="page-sub">Books you want to come back to.</p>
      {!LoggedIn ? (
        <div className="empty-card">
          <div className="empty-icon">♡</div>
          <h2>Log in to view your wishlist</h2>
          <p>Save books from a book page after you sign in.</p>
        </div>
      ) : WishlistBooks.length === 0 ? (
        <div className="empty-card">
          <div className="empty-icon">♡</div>
          <h2>No saved books</h2>
          <p>Tap Add to Wishlist on a book page.</p>
          <button className="empty-cta" onClick={() => navigate("/discover")}>Browse books</button>
        </div>
      ) : (
        <div className="wishlist-page">
              {WishlistBooks.map(book => {
                return (
                  <div key={book.bookId} className="wishlist-book-card">
                    <button className="wishlist-button" onClick={() => RemoveBook(book.bookId)}>{"❤️"}</button>
                    <BookCard BookId={book.bookId} Source="wishlist" Book={book} />
                    <button className="wishlist-add-cart" type="button" onClick={() => AddToCart(book)}>
                      Add to cart
                    </button>
                  </div>
                )
              })}
        </div>
      )}
    </div>
  )
}

export default Wishlist