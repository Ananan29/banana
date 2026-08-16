import React, { useState, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ LoggedIn }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [CartBooks, setCartBooks] = useState({ books: [], total: 0 });
  const [WishlistBooks, setWishlistBooks] = useState([]);
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  const tokenHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const refreshCart = async () => {
    const response = await axios.get(`${API_URL}/cart/`, {
      headers: tokenHeaders(),
    });
    setCartBooks({
      books: response.data.books || [],
      total: response.data.total || 0,
    });
  };

  const refreshWishlist = async () => {
    const response = await axios.get(`${API_URL}/wishlist/`, {
      headers: tokenHeaders(),
    });
    setWishlistBooks(response.data || []);
  };

  const RemoveBook = async (bookId) => {
    try {
      await axios.delete(`${API_URL}/cart/${bookId}`, {
        headers: tokenHeaders(),
      });
      setCartBooks((prev) => {
        const books = (prev.books || []).filter(
          (book) => String(book.bookId) !== String(bookId)
        );
        const total = books.reduce((sum, book) => sum + (book.price || 0), 0);
        return { books, total };
      });
    } catch (err) {
      setNotice(err.response?.data?.message || "Could not remove book.");
    }
  };

  const MoveToWishlist = async (book) => {
    try {
      await axios.post(`${API_URL}/wishlist/${book.bookId}`, {}, {
        headers: tokenHeaders(),
      });
      setWishlistBooks((prev) => {
        if (prev.some((item) => String(item.bookId) === String(book.bookId))) {
          return prev;
        }
        return [...prev, book];
      });
      await RemoveBook(book.bookId);
    } catch (err) {
      setNotice(err.response?.data?.message || "Could not move to wishlist.");
    }
  };

  const AddBookToCart = async (book) => {
    try {
      await axios.post(`${API_URL}/cart/${book.bookId}`, {}, {
        headers: tokenHeaders(),
      });
      await refreshCart();
      setWishlistBooks((prev) =>
        prev.filter((item) => String(item.bookId) !== String(book.bookId))
      );
      setNotice(`Added “${book.title}” to cart.`);
    } catch (err) {
      setNotice(err.response?.data?.message || "Could not add to cart.");
    }
  };

  const OpenBookPage = (BookId) => {
    navigate(`/book/${BookId}`, { state: { from: "/cart" } });
  };

  const ProceedToPayment = () => {
    navigate("/payment", { state: { cart: CartBooks } });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        await Promise.all([refreshCart(), refreshWishlist()]);
      } catch (err) {
        console.log(err.message);
      }
    };
    load();
  }, [API_URL]);

  const books = CartBooks.books || [];
  const cartIds = new Set(books.map((book) => String(book.bookId)));
  const addableWishlist = WishlistBooks.filter(
    (book) => !cartIds.has(String(book.bookId))
  );
  const itemCount = books.length;
  const total = Number(CartBooks.total || 0);

  if (!LoggedIn) {
    return (
      <div className="page-shell">
        <h1 className="page-heading">Cart</h1>
        <div className="empty-card">
          <div className="empty-icon">🛒</div>
          <h2>Log in to view your cart</h2>
          <p>Add books from a book page after you sign in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell cart-page">
      <div className="cart-header">
        <div>
          <h1 className="page-heading">Shopping cart</h1>
          <p className="page-sub">
            {itemCount === 0
              ? "Your bag is empty — add a book below."
              : `${itemCount} ${itemCount === 1 ? "book" : "books"} ready to buy.`}
          </p>
        </div>
        <button className="cart-continue" onClick={() => navigate("/discover")}>
          Continue shopping
        </button>
      </div>

      {notice && <p className="cart-notice">{notice}</p>}

      <div className="cart-layout">
        <div className="cart-main">
          {itemCount === 0 ? (
            <div className="empty-card cart-empty-panel">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Add a book from Discover, or from your wishlist below.</p>
              <button className="empty-cta" onClick={() => navigate("/discover")}>
                Browse books
              </button>
            </div>
          ) : (
            books.map((book) => (
              <div key={book.bookId} className="cart-item">
                <img
                  className="cart-book-image"
                  src={book.coverImage}
                  alt={book.title}
                  onClick={() => OpenBookPage(book.bookId)}
                />
                <div className="cart-item-info">
                  <button
                    type="button"
                    className="cart-book-name"
                    onClick={() => OpenBookPage(book.bookId)}
                  >
                    {book.title}
                  </button>
                  <p className="cart-book-author">{book.author}</p>
                  <div className="cart-item-actions">
                    <button type="button" onClick={() => MoveToWishlist(book)}>
                      Save for later
                    </button>
                    <button type="button" onClick={() => RemoveBook(book.bookId)}>
                      Remove
                    </button>
                  </div>
                </div>
                <p className="cart-book-price">₹{Number(book.price || 0).toFixed(2)}</p>
              </div>
            ))
          )}

          {addableWishlist.length > 0 && (
            <div className="cart-suggestions">
              <h3>Add from wishlist</h3>
              {addableWishlist.map((book) => (
                <div key={book.bookId} className="cart-suggest-row">
                  <img src={book.coverImage} alt={book.title} />
                  <div>
                    <p>{book.title}</p>
                    <span>{book.author}</span>
                  </div>
                  <button type="button" onClick={() => AddBookToCart(book)}>
                    Add to cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="cart-summary">
          <h3>Order summary</h3>
          <div className="cart-summary-row">
            <span>Items</span>
            <span>{itemCount}</span>
          </div>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="cart-summary-total">
            <span>Total</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
          <button
            className="cart-payment-button"
            onClick={ProceedToPayment}
            disabled={itemCount === 0}
          >
            {itemCount === 0 ? "Add a book to pay" : `Checkout · ₹${total.toFixed(2)}`}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
