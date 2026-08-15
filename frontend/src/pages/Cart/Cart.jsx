import React, { useState, useEffect } from "react";
import "./Cart.css";
import BookDetails from "./../../data/books.js";
import SeriesDetails from "./../../data/series.js"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = ({ LoggedIn }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [CartBooks, setCartBooks] = useState([]);
  const navigate = useNavigate();
  const RemoveBook = async(bookId) => {
    try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          return;
        }
        const response = await axios.delete(`${API_URL}/cart/${bookId}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setCartBooks(response.data);
      } catch (err) {
        console.log(err.message);
      }
      window.location.reload();
  }
  const AddToWishlist = async(bookId) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(`http://localhost:5001/api/wishlist/${BookId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
      } catch (err) {
        console.log(err.message);
      }

    RemoveBook(bookId);

    window.location.reload();

  }
  const OpenBookPage = (BookId) => {
    navigate(`/book/${BookId}`, { state: { from: "/cart" } });
  }
  const ProceedToPayment = () => {
    // navigate to payment page and pass cart data
    navigate("/payment", { state: { cart: CartBooks } });
  }
  useEffect(() => {
    const getCartBooks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          return;
        }
        const response = await axios.get(`${API_URL}/cart/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setCartBooks(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getCartBooks();
  }, [])
  return (
    <div>Cart
      {!LoggedIn ? (
        <p>log in to access this feauture</p>
      ) : (
        CartBooks.length === 0 ? (
          <p>Add books</p>
        ) : (
          <div className="cart">
            {
              CartBooks.books?.map(book => {
                // const currSeries = SeriesDetails.find(seriesDetails => seriesDetails.seriesId === currBook.seriesId);
                return (
                  <div key={book.bookId} className="buy-book-card">
                    <img className="cart-book-image" src={book.coverImage} />
                    <p className="cart-book-name" onClick={() => OpenBookPage(book.bookId)}>{book.title}</p>
                    <p className="cart-book-author">{book.author}</p>
                    <p className="cart-book-series"></p>
                    {/* <p className="cart-book-series">{currSeries?.seriesName}{book.seriesBookNumber ? " #" : ""}{book.seriesBookNumber}</p> */}
                    <button className="cart-wishlist-button" onClick={() => AddToWishlist(book.bookId)}>Move to Wishlist</button>
                    <p className="cart-book-price">{book.bookPrice}</p>
                    <button className="remove-book-button" onClick={() => RemoveBook(book.bookId)}>×</button>
                  </div>
                );
              })
            }
            <p className="cart-total-price">{CartBooks.total}</p>
            <button className="cart-payment-button" onClick={ProceedToPayment}>Proceed to payment</button>
          </div>
        ))}
    </div>
  )
}

export default Cart