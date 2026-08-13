import React, { useState, useEffect } from "react";
import "./BookPage.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SeriesDetails from "./../../data/series";
import axios from "axios";
const BookPage = ({ LoggedIn, onShowAuth }) => {
    const { BookId } = useParams();
    const location = useLocation();
    // getting book details
    const [BookDetails, setBookDetails] = useState({
        title: "",
        author: "",
        authorId:0,
        genre: [],
        coverImage: null,
        description: "",
        series: "",
        seriesId: 0,
        totalChapters: 1,
        language: "English",
        price: 6.99,
        publishedAt: "",
        averageRating: 0,
        ratingsCount: 0,
        isinCart:false,
        isinWishlist:false,
        bookOwned:false,
    });
    useEffect(() => {
        const GetBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/books/${BookId}`);
                console.log(response.data);
                setBookDetails({
                    title: response.data.title,
                    author: response.data.author,
                    authorId:response.data.authorId,
                    genre: response.data.genres,
                    coverImage: response.data.coverImage,
                    description: response.data.description,
                    series: response.data.series,
                    seriesId:response.data.seriesId,
                    totalChapters: response.data.totalChapters,
                    language: response.data.language,
                    price: response.data.price,
                    publishedAt: response.data.publishedAt,
                    averageRating: response.data.averageRating,
                    ratingsCount: response.data.ratingsCount,
                    isinCart:false,
                    isinWishlist:false,
                    bookOwned:false,
                });
            } catch (err) {
                console.log(err.message);
            }
        }
        GetBookDetails();
    }, [])
    const formatCount = (n) => {
        if (n === undefined || n === null) return 0;
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        return n;
    }
    
    // wishlist and cart
    const BuyClicked = () => {
        if (!LoggedIn) onShowAuth();
        else {
            //push to cart
            window.location.reload();
        }
    }
    const WishlistClicked = () => {
        if (!LoggedIn) onShowAuth();
        else {
            //push to wishlist
            window.location.reload();
        }
    }

    // navigates
    const navigate = useNavigate();
    const GoBack = () => {
        navigate(-1);
    }
    const GoToCart = () => {
        navigate("/cart");
    }
    const GoToWishlist = () => {
        navigate("/wishlist");
    }
    const GoToSeriesPage = () => {
        navigate(`/series/${BookDetails.seriesId}`);
    }
    const GoToAuthorPage = () => {
        navigate(`/author/${BookDetails.authorId}`);
    }
    const OpenBook = () => {
        navigate(`/readbook/${BookDetails.bookId}`);
    }
    
    return (
        <div>
            <div className="book-page">
                {/* <div className="book-wrapper"> */}
                <div className="book-container">
                    <button className="back-button" onClick={GoBack}>{"﹤"}</button>

                    {BookDetails.ratingsCount > 0 && (
                        <div className="book-rating top-right">
                            <div className="avg-rating">{Number(BookDetails.averageRating || 0).toFixed(1)}</div>
                            <div className="ratings-count">({formatCount(BookDetails.ratingsCount)}) ratings</div>
                        </div>
                    )}

                    <div className="book-left">
                        <img
                            src={BookDetails.coverImage}
                            alt={BookDetails.title}
                            className="book-cover"
                        />
                        {
                            BookDetails.bookOwned ? (
                                <button className="buy-btn" onClick={OpenBook}>Open Book</button>
                            ) : (

                                BookDetails.isinCart ? (<div className="book-buy-wishlist-buttons">
                                    <button className="go-to-cart-btn" onClick={GoToCart}>
                                        Go To Cart
                                    </button>
                                </div>
                                ) : (
                                    <div className="book-buy-wishlist-buttons">
                                        <button className="buy-btn" onClick={BuyClicked}>
                                            Buy ${BookDetails.price}
                                        </button>
                                        {
                                            BookDetails.isinWishlist ? (
                                                <button className="wishlist-btn" onClick={GoToWishlist}>
                                                    Go To Wishlist
                                                </button>
                                            ) : (
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

                        <h1>{BookDetails.title}</h1>

                        {BookDetails.series && (
                            <div className="series-tag" onClick={GoToSeriesPage}>
                                {BookDetails.series}
                                {BookDetails.seriesBookNumber && ` #${BookDetails.seriesBookNumber}`}
                            </div>
                        )}

                        <p className="author" onClick={GoToAuthorPage}>{BookDetails.author}</p>

                        <div className="description">
                            <h3>Description</h3>
                            <p>{BookDetails.description}</p>
                        </div>

                        <div className="genres">
                            <h3>Genres</h3>
                            <p>{BookDetails.genre && BookDetails.genre.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")}</p>
                        </div>

                        <div className="book-info">

                            <div className="book-info-item">
                                <span>Total Chapters</span>
                                <p>{BookDetails.totalChapters}</p>
                            </div>

                            <div className="book-info-item">
                                <span>Published</span>
                                <p>
                                    {new Date(BookDetails.publishedAt).toLocaleDateString("en-GB", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>

                            <div className="book-info-item">
                                <span>Language</span>
                                <p>{BookDetails.language ? BookDetails.language.charAt(0).toUpperCase() + BookDetails.language.slice(1) : ''}</p>
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