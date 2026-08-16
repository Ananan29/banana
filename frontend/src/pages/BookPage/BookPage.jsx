import React, { useState, useEffect } from "react";
import "./BookPage.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookPage = ({ LoggedIn, onShowAuth }) => {
    const { BookId } = useParams();
    const navigate = useNavigate();
    const [BookDetails, setBookDetails] = useState({
        title: "",
        author: "",
        authorId: 0,
        genre: [],
        coverImage: null,
        description: "",
        series: "",
        seriesId: 0,
        totalChapters: 1,
        language: "English",
        price: null,
        publishedAt: "",
        averageRating: 0,
        ratingsCount: 0,
        isinCart: false,
        isinWishlist: false,
        bookOwned: false,
        seriesBookNumber: 0,
    });
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const GetBookDetails = async () => {
            if (!BookId) {
                setLoadError("This book could not be loaded.");
                return;
            }
            try {
                setLoadError("");
                const token = localStorage.getItem("authToken");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await axios.get(`http://localhost:5001/api/book/${BookId}`, {
                    headers,
                });
                let isinCart = false;
                if (token) {
                    try {
                        const cartResponse = await axios.get("http://localhost:5001/api/cart/", {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        isinCart = (cartResponse.data.books || []).some(
                            (book) => String(book.bookId) === String(BookId)
                        );
                    } catch (err) {
                        console.log(err.message);
                    }
                }
                setBookDetails({
                    title: response.data.title,
                    author: response.data.author,
                    authorId: response.data.authorId,
                    genre: response.data.genres,
                    coverImage: response.data.coverImage,
                    description: response.data.description,
                    series: response.data.series,
                    seriesId: response.data.seriesId,
                    totalChapters: response.data.totalChapters,
                    language: response.data.language,
                    price: response.data.price,
                    publishedAt: response.data.publishedAt,
                    averageRating: response.data.averageRating,
                    ratingsCount: response.data.ratingsCount,
                    isinCart,
                    isinWishlist: response.data.isFavourite || false,
                    bookOwned: response.data.isOwned || false,
                    seriesBookNumber: response.data.seriesNo,
                });
            } catch (err) {
                setLoadError(err.response?.data?.message || "This book could not be loaded.");
                console.log(err.message);
            }
        };
        GetBookDetails();
    }, [BookId]);

    const formatCount = (n) => {
        if (n === undefined || n === null) return 0;
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
        return n;
    };

    const BuyClicked = () => {
        if (!LoggedIn) {
            onShowAuth();
            return;
        }
        const insertCart = async () => {
            try {
                const token = localStorage.getItem("authToken");
                await axios.post(
                    `http://localhost:5001/api/cart/${BookId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (err) {
                console.log(err.message);
            }
        };
        insertCart();
        setBookDetails((prev) => ({ ...prev, isinCart: true }));
    };

    const WishlistClicked = async () => {
        if (!LoggedIn) {
            onShowAuth();
            return;
        }
        try {
            const token = localStorage.getItem("authToken");
            if (BookDetails.isinWishlist) {
                await axios.delete(`http://localhost:5001/api/wishlist/${BookId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookDetails((prev) => ({ ...prev, isinWishlist: false }));
            } else {
                await axios.post(
                    `http://localhost:5001/api/wishlist/${BookId}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBookDetails((prev) => ({ ...prev, isinWishlist: true }));
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const GoBack = () => navigate(-1);
    const GoToCart = () => navigate("/cart");
    const GoToSeriesPage = () => navigate(`/series/${BookDetails.seriesId}`);
    const GoToAuthorPage = () => navigate(`/author/${BookDetails.authorId}`);
    const OpenBook = () => navigate(`/readbook/${BookId}`);

    let actionButtons;
    if (BookDetails.bookOwned) {
        actionButtons = (
            <button className="buy-btn" onClick={OpenBook}>
                Open Book
            </button>
        );
    } else {
        actionButtons = (
            <div className="book-buy-wishlist-buttons">
                {BookDetails.isinCart ? (
                    <button className="go-to-cart-btn" onClick={GoToCart}>
                        Go To Cart
                    </button>
                ) : (
                    <button className="buy-btn" onClick={BuyClicked}>
                        Buy Rs.{BookDetails.price}
                    </button>
                )}
                <button className="wishlist-btn" onClick={WishlistClicked}>
                    {BookDetails.isinWishlist ? "Remove from Wishlist" : "Add To Wishlist"}
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="book-page">
                <div className="book-container">
                    <button className="back-button" onClick={GoBack}>
                        {"﹤"}
                    </button>

                    {BookDetails.ratingsCount > 0 && (
                        <div className="book-rating top-right">
                            <div className="avg-rating">
                                {Number(BookDetails.averageRating || 0).toFixed(1)}
                            </div>
                            <div className="ratings-count">
                                ({formatCount(BookDetails.ratingsCount)}) ratings
                            </div>
                        </div>
                    )}

                    <div className="book-left">
                        <img
                            src={BookDetails.coverImage}
                            alt={BookDetails.title}
                            className="book-cover"
                        />
                        {actionButtons}
                    </div>

                    <div className="book-right">
                        <h1>{BookDetails.title || (loadError ? "Book unavailable" : "")}</h1>
                        {loadError && <p className="description">{loadError}</p>}

                        {BookDetails.series && (
                            <div className="series-tag" onClick={GoToSeriesPage}>
                                {BookDetails.series}
                                {BookDetails.seriesBookNumber && ` #${BookDetails.seriesBookNumber}`}
                            </div>
                        )}

                        <p className="author" onClick={GoToAuthorPage}>
                            {BookDetails.author}
                        </p>

                        <div className="description">
                            <h3>Description</h3>
                            <p>{BookDetails.description}</p>
                        </div>

                        <div className="genres">
                            <h3>Genres</h3>
                            <div className="genre-chips">
                                {BookDetails.genre &&
                                    BookDetails.genre.map((g) => (
                                        <button
                                            type="button"
                                            key={g}
                                            className="genre-chip"
                                            onClick={() => navigate(`/genre/${encodeURIComponent(g)}`)}
                                        >
                                            {g.charAt(0).toUpperCase() + g.slice(1)}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <div className="book-info">
                            <div className="book-info-item">
                                <span>Total Chapters</span>
                                <p>{BookDetails.totalChapters}</p>
                            </div>

                            <div className="book-info-item">
                                <span>Published</span>
                                <p>
                                    {BookDetails.publishedAt &&
                                    !Number.isNaN(new Date(BookDetails.publishedAt).getTime())
                                        ? new Date(BookDetails.publishedAt).toLocaleDateString("en-GB", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                          })
                                        : "—"}
                                </p>
                            </div>

                            <div className="book-info-item">
                                <span>Language</span>
                                <p>
                                    {BookDetails.language
                                        ? BookDetails.language.charAt(0).toUpperCase() +
                                          BookDetails.language.slice(1)
                                        : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
