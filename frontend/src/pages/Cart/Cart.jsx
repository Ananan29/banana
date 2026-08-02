import React, { useState, useEffect } from "react";
import "./Cart.css";
import BookDetails from "./../../data/books.js";
import { useNavigate } from "react-router-dom";
const Cart = ({LoggedIn}) => {
    const [CartBooks, setCartBooks] = useState(JSON.parse(localStorage.getItem("BooksInCart")));
    const navigate=useNavigate();
    const RemoveBook=(BookId)=>{
      let books=CartBooks;
      books=books.filter(bookId=>bookId!==BookId);
      localStorage.setItem("BooksInCart",JSON.stringify(books));
      window.location.reload();
    }
    const AddToWishlist=(BookId)=>{
      console.log(BookId);
      const existingBooks=localStorage.getItem("BooksInWishlist");
      let wishlistBooks=JSON.parse(existingBooks);
      if(wishlistBooks===null)wishlistBooks=[];
      if(!wishlistBooks.includes(BookId)){
          wishlistBooks.push(BookId);
          localStorage.setItem("BooksInWishlist", JSON.stringify(wishlistBooks));
      }
      RemoveBook(BookId);
    }
    const OpenBookPage=(BookId)=>{
      navigate(`/cart/${BookId}`);
    }
    const ProceedToPayment=()=>{}
  return (
    <div>Cart
      {!LoggedIn?(
        <p>log in to access this feauture</p>
      ):(
        <div className="cart">
          {
            CartBooks.map(bookId=>{
              const currBook=BookDetails.find(bookDetails=>bookDetails.bookId===Number(bookId));
              return(
                <div key={bookId} className="buy-book-card">
                  <img className="cart-book-image" src={currBook?.pic}/>
                  <p className="cart-book-name" onClick={()=>OpenBookPage(bookId)}>{currBook?.bookName}</p>
                  <p className="cart-book-author">{currBook?.author}</p>
                  <p className="cart-book-series">{currBook?.series}{currBook?.seriesBookNumber?" #":""}{currBook?.seriesBookNumber}</p>
                  <button className="cart-wishlist-button" onClick={()=>AddToWishlist(bookId)}>Move to Wishlist</button>
                  <p className="cart-book-price">{currBook?.bookPrice}</p>
                  <button className="remove-book-button" onClick={()=>RemoveBook(bookId)}>×</button>
                </div>
              );
            })
          }
          <button className="cart-payment-button" onClick={ProceedToPayment}>Proceed to payment</button>
        </div>
      )}
    </div>
  )
}

export default Cart