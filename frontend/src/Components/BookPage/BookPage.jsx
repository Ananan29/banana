import React,{ useState, useEffect } from "react";
import "./BookPage.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import BookDetails from "./../../data/books";
import SeriesDetails from "./../../data/series";
const BookPage = ({LoggedIn, onShowAuth}) => {
    const {BookId}=useParams();
    const location = useLocation();
    const [OwnedBookIds, setOwnedBookIds] = useState(JSON.parse(localStorage.getItem("ownedBooks"))||[]);
    const [BooksInCart, setBooksInCart] = useState(JSON.parse(localStorage.getItem("BooksInCart"))||[]);
    const [BooksInWishlist, setBooksInWishlist] = useState(JSON.parse(localStorage.getItem("BooksInWishlist"))||[]);
    const [BookInCart, setBookInCart] = useState(BooksInCart.find((bookincart)=>(bookincart)===(BookId)));
    const [BookInWishlist,setBookInWishlist]=useState(BooksInWishlist.find((bookinwishlist)=>(bookinwishlist)===(BookId)));
    const book=BookDetails.find(x=>x.bookId===(BookId));
    const series=SeriesDetails.find(x=>x.seriesId===book.seriesId)||null;
    const navigate=useNavigate();
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
            window.location.reload();
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
            window.location.reload();
        }
    }
    const GoBack=()=>{
        navigate(-1);
    }
    const GoToCart=()=>{
        navigate("/cart");
    }
    const GoToWishlist=()=>{
        navigate("/wishlist");
    }
    const GoToSeriesPage=()=>{
        navigate(`/series/${book.seriesId}`);
    }
    const GoToAuthorPage=()=>{
        navigate(`/author/${book.authorId}`);
    }
    const OpenBook=()=>{
        navigate(`/readbook/${book.bookId}`);
    }
  return (
    <div>
        <div className="book-page">
            {/* <div className="book-wrapper"> */}
        <div className="book-container">
            <button className="back-button" onClick={GoBack}>{"﹤"}</button>

            <div className="book-left">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="book-cover"
                />
                {
                    OwnedBookIds.find((ownedbooksid)=>(ownedbooksid)===(BookId))?(
                        <button className="buy-btn" onClick={OpenBook}>Open Book</button>
                    ):(
                        
                            BookInCart?(<div className="book-buy-wishlist-buttons">
                                <button className="go-to-cart-btn" onClick={GoToCart}>
                                    Go To Cart
                                </button>
                                </div>
                            ):(
                                <div className="book-buy-wishlist-buttons">
                                    <button className="buy-btn" onClick={BuyClicked}>
                                        Buy ${book.bookPrice}
                                    </button>
                                    {
                                        BookInWishlist?(
                                            <button className="wishlist-btn" onClick={GoToWishlist}>
                                                Go To Wishlist
                                            </button>
                                        ):(
                                            <button className="wishlist-btn" onClick={WishlistClicked}>
                                                Add To Wishlist
                                            </button>
                                        )
                                    }
                                </div>
                            )
                        
                    )
                }

            </div>

            <div className="book-right">

                <h1>{book.title}</h1>

                {series && (
                    <div className="series-tag" onClick={GoToSeriesPage}>
                        {series.seriesName}
                        {book.seriesBookNumber && ` #${book.seriesBookNumber}`}
                    </div>
                )}

                <p className="author" onClick={GoToAuthorPage}>{book.author}</p>

                <div className="description">
                    <h3>Description</h3>
                    <p>{book.description}</p>
                </div>

                <div className="genres">
                    <h3>Genres</h3>
                    <p>{book.genre.join(", ")}</p>
                </div>

                <div className="book-info">

                    <div className="book-info-item">
                        <span>Total Chapters</span>
                        <p>{book.totalChapters}</p>
                    </div>

                    <div className="book-info-item">
                        <span>Published</span>
                        <p>{book.publishedAt}</p>
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