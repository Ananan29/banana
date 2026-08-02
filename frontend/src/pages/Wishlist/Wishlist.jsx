import React, { useState, useEffect } from "react"
import BookDetails from "./../../data/books.js";
const Wishlist = ({LoggedIn}) => {
    const [WishlistBooks, setWishlistBooks] = useState(JSON.parse(localStorage.getItem("BooksInWishlist")));
    useEffect(()=>{
      console.log(WishlistBooks);
    },[]);
    const RemoveBook=(BookId)=>{
      let books=WishlistBooks;
      books=books.filter(bookId=>bookId!==BookId);
      localStorage.setItem("BooksInWishlist",JSON.stringify(books));
      window.location.reload();
    }
    const AddToCart=(BookId)=>{
      console.log(BookId);
      const existingBooks=localStorage.getItem("BooksInCart");
      let cartBooks=JSON.parse(existingBooks);
      if(cartBooks===null)cartBooks=[];
      if(!cartBooks.includes(BookId)){
          cartBooks.push(BookId);
          localStorage.setItem("BooksInCart", JSON.stringify(cartBooks));
      }
      RemoveBook(BookId);
    }
  return (
    <div>Wishlist
       {!LoggedIn?(
        <p>log in to access this feauture</p>
      ):(
        <div className="wishlist-page">
          {
            WishlistBooks.map(wishlistBooks=>{
              return (
                <div className="wishlist-book-card">
                  <p>{wishlistBooks}</p>
                </div>
              )
            })
          }
        </div>
      )}
    </div>
  )
}

export default Wishlist