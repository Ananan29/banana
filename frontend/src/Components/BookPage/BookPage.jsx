import React from "react";
import "./BookPage.css";
import { useParams, useNavigate } from "react-router-dom";
import BookDetails from "./../../data/books";
const BookPage = ({LoggedIn, onShowAuth}) => {
    const {BookId,Source}=useParams();
    const navigate=useNavigate();
    const GoBack=()=>{
        navigate(`/${Source}`);
    }
    const book=BookDetails.find(x=>x.bookId===Number(BookId));
    console.log(book.author);
    const BuyClicked=()=>{
        if(!LoggedIn)onShowAuth();
        else{
            let existingBooks=localStorage.getItem("BooksInCart");
            let buyBooks=JSON.parse(existingBooks);
            if(buyBooks===null)buyBooks=[];
            if (!buyBooks.includes(BookId)) {
                buyBooks.push(BookId);
                localStorage.setItem("BooksInCart", JSON.stringify(buyBooks));
            }
            else console.log("book already in cart");
        }
    }
    const WishlistClicked=()=>{
        if(!LoggedIn)onShowAuth();
        else{
            const existingBooks=localStorage.getItem("BooksInWishlist");
            let wishlistBooks=JSON.parse(existingBooks);
            if(wishlistBooks===null)wishlistBooks=[];
            if(!wishlistBooks.includes(BookId)){
                wishlistBooks.push(BookId);
                localStorage.setItem("BooksInWishlist", JSON.stringify(wishlistBooks));
            }
            else console.log("book already in wishlist");
        }
    }
  return (
    <div>
        <div className="book-page">
            {/* <div className="book-wrapper"> */}
        <div className="book-container">
            <button className="back-button" onClick={GoBack}>{"﹤"}</button>

            <div className="book-left">
                <img
                    src={book.pic}
                    alt={book.bookName}
                    className="book-cover"
                />

                <button className="buy-btn" onClick={BuyClicked}>
                    Buy {book.bookPrice}
                </button>

                <button className="wishlist-btn" onClick={WishlistClicked}>
                    Wishlist
                </button>
            </div>

            <div className="book-right">

                <h1>{book.bookName}</h1>

                {book.series && (
                    <div className="series-tag">
                        {book.series}
                        {book.seriesBookNumber && ` #${book.seriesBookNumber}`}
                    </div>
                )}

                <p className="author">{book.author}</p>

                <div className="description">
                    <h3>Description</h3>
                    <p>{book.description}</p>
                </div>

                <div className="genres">
                    <h3>Genres</h3>
                    <p>{book.genre}</p>
                </div>

                <div className="book-info">

                    <div className="book-info-item">
                        <span>Total Chapters</span>
                        <p>{book.chapters}</p>
                    </div>

                    <div className="book-info-item">
                        <span>Published</span>
                        <p>{book.publishDate}</p>
                    </div>

                    <div className="book-info-item">
                        <span>Language</span>
                        <p>{book.language}</p>
                    </div>

                </div>
                </div>
            </div>

        </div>
    {/* </div> */}
    </div>
  )
}

export default BookPage