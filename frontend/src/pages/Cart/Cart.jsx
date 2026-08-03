import React, { useState, useEffect } from "react";
import "./Cart.css";
import BookDetails from "./../../data/books.js";
import SeriesDetails from "./../../data/series.js"
import { useNavigate } from "react-router-dom";
const Cart = ({LoggedIn}) => {
    const [CartBooks, setCartBooks] = useState(JSON.parse(localStorage.getItem("BooksInCart")))||[];
    const [TotalPrice, setTotalPrice] = useState(0);
    const navigate=useNavigate();
    useEffect(()=>{
      let totalprice=0;
      for(let i=0;i<CartBooks.length;i++){
        const book=BookDetails.find(x=>(x.bookId===(CartBooks[i])));
        totalprice+=(book.bookPrice);
      }
      setTotalPrice(totalprice);
    },[]);
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
      navigate(`/book/${BookId}`,{state:{from:"/cart"}});
    }
    const ProceedToPayment=()=>{
      let ownedBooks = JSON.parse(localStorage.getItem("ownedBooks")) || [];
      let topurchase=[...ownedBooks];
      console.log(topurchase);
      for(let i=0;i<CartBooks.length;i++){
        if(!ownedBooks.includes(CartBooks[i]))topurchase.push(CartBooks[i]);
      }
      localStorage.setItem("ownedBooks",JSON.stringify(topurchase));
      localStorage.setItem("BooksInCart",JSON.stringify([]));
      navigate("/library");
    }
  return (
    <div>Cart
      {!LoggedIn?(
        <p>log in to access this feauture</p>
      ):(
        CartBooks.length===0?(
          <p>Add books</p>
        ):(
        <div className="cart">
          {
            CartBooks.map(bookId=>{
              const currBook=BookDetails.find(bookDetails=>bookDetails.bookId===(bookId));
              const currSeries=SeriesDetails.find(seriesDetails=>seriesDetails.seriesId===currBook.seriesId);
              return(
                <div key={bookId} className="buy-book-card">
                  <img className="cart-book-image" src={currBook?.pic}/>
                  <p className="cart-book-name" onClick={()=>OpenBookPage(bookId)}>{currBook?.bookName}</p>
                  <p className="cart-book-author">{currBook?.author}</p>
                  <p className="cart-book-series">{currSeries?.seriesName}{currBook?.seriesBookNumber?" #":""}{currBook?.seriesBookNumber}</p>
                  <button className="cart-wishlist-button" onClick={()=>AddToWishlist(bookId)}>Move to Wishlist</button>
                  <p className="cart-book-price">{currBook?.bookPrice}</p>
                  <button className="remove-book-button" onClick={()=>RemoveBook(bookId)}>×</button>
                </div>
              );
            })
          }
          <p className="cart-total-price">{TotalPrice}</p>
          <button className="cart-payment-button" onClick={ProceedToPayment}>Proceed to payment</button>
        </div>
      ))}
    </div>
  )
}

export default Cart