import React from "react";
import BookCard from "./../BookCard/BookCard.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import "./BookScroll.css";
import axios from "axios";
const BookScroll = ({ Title, PreBooks }) => {
    const [Start, setStart] = useState(0);

    // for number of cards
    const [visibleCards, setVisibleCards] = useState(5);

    const updateVisibleCards = () => {
        const el = scrollRef.current;

        if (!el) return;

        const card = el.children[0];

        if (!card) return;

        const cardWidth = card.offsetWidth;

        setVisibleCards(Math.ceil(el.clientWidth / cardWidth));
    };
    useEffect(() => {
        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => {
            window.removeEventListener("resize", updateVisibleCards);
        };
    }, []);
    useEffect(() => {
        console.log(Start);
    }, [Start])

    // for scroll
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const scroll = (amount) => {
        scrollRef.current.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };
    const handleWheel = (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
        }
    };

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 5);

        setShowRight(
            el.scrollLeft < el.scrollWidth - el.clientWidth - 5 || HasMore
        );
    };
    const getCardWidth = () => {
        const el = scrollRef.current;

        if (!el) return 0;

        const card = el.children[0];

        if (!card) return 0;

        return card.offsetWidth;
    };
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateArrows();
        el.addEventListener("scroll", updateArrows);
        window.addEventListener("resize", updateArrows);

        return () => {
            el.removeEventListener("scroll", updateArrows);
            window.removeEventListener("resize", updateArrows);
        };
    }, []);
    const nextPage = async () => {
        const cardWidth = getCardWidth();
        if (!cardWidth) return;
        const amount = Math.round(cardWidth * Math.max(1, visibleCards - 1));
        const el = scrollRef.current;
        if (!el) return;

        // If we're near the end and there are more on the server, fetch more first
        const remaining = el.scrollWidth - (el.scrollLeft + el.clientWidth);
        if (remaining < cardWidth * (visibleCards + 1) && HasMore) {
            const ok = await loadMore();
            if (!ok) {
                // fetch failed — don't scroll forward
                return;
            }
        }

        scroll(amount);
    };

    const prevPage = () => {
        const cardWidth = getCardWidth();
        if (!cardWidth) return;
        const amount = Math.round(cardWidth * Math.max(1, visibleCards - 1));
        scroll(-amount);
    };



    // for rendering books
    const [BooksDetails, setBooksDetails] = useState(PreBooks || []);
    const [ErrorMessage, setErrorMessage] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [HasMore, setHasMore] = useState(true);

    // load more items from API and append to list
    const loadMore = async () => {
        try {
            setLoading(true);
            const start = BooksDetails.length;
            const limit = Math.max(visibleCards + 2, 6);
            const response = await axios.get(`http://localhost:5001/api/books/${Title}?limit=${limit}&start=${start}`);
            const books = response.data.books || [];
            setHasMore(books.length >= limit - 1);
            if (books.length > 0) {
                setBooksDetails(prev => [...prev, ...books.slice(0, limit - 1)]);
            }
            setErrorMessage(null);
            return true;
        } catch (err) {
            setErrorMessage(err?.message || String(err));
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // reset when PreBooks changes (e.g., new Title or initial data)
        setBooksDetails(PreBooks || []);
        setStart(0);
        setHasMore(true);
        setLoading(false);
    }, [PreBooks]);

    // if there are no PreBooks, fetch an initial batch
    useEffect(() => {
        if (!PreBooks || PreBooks.length === 0) {
            loadMore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Title, visibleCards]);
    useEffect(() => {
        console.log(BooksDetails);
    }, [BooksDetails])


    return (
        <div className="book-scroll-section">
            <>
                <h4 className="discover-page-book-scroll-title">{Title}</h4>
                {ErrorMessage && (
                    <div className="book-scroll-error-inline">Failed to load more books</div>
                )}
                <div className="books-section">
                    {showLeft && (
                        <button
                            className={"scroll-btn left"}
                            onClick={() => { prevPage(); }}
                        >
                            <FaChevronLeft />
                        </button>
                    )}
                    <div className="books-scroll-cards" ref={scrollRef} onWheel={handleWheel}>
                        {
                            BooksDetails && BooksDetails.length > 0 ? (
                                BooksDetails.map(
                                    bookdetails => <BookCard key={bookdetails.bookId} BookId={bookdetails.bookId} Source="discover" />
                                )
                            ) : (
                                // render placeholders to reserve space and avoid layout shift
                                Array.from({ length: Math.max(visibleCards + 1, 5) }).map((_, i) => (
                                    <div key={"ph" + i} className="book-card placeholder" />
                                ))
                            )

                        }
                    </div>
                    {showRight && (
                        <button className={"scroll-btn right"} onClick={() => { nextPage(); }} disabled={Loading}>
                            <FaChevronRight />
                        </button>
                    )}
                </div>
            </>

        </div>
    )
}

export default BookScroll