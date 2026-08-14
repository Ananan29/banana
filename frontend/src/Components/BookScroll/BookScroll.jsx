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

    const scrollRef = useRef(null);

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
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    // scroll state
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);
    const [BooksDetails, setBooksDetails] = useState(PreBooks || []);
    const [Loading, setLoading] = useState(true);
    const [HasMore, setHasMore] = useState(true);

    const scroll = (amount) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    };

    const handleWheel = (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault();
    };

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 5);
        setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5 || HasMore);
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
    }, [HasMore]);

  const API_URL = import.meta.env.VITE_API_URL;
    const loadMore = async () => {
        try {
            setLoading(true);
            const start = BooksDetails.length;
            const limit = Math.max(visibleCards + 2, 6);
            const response = await axios.get(`${API_URL}/book/${Title}?limit=${limit}&start=${start}`);
            const books = response.data.books || [];
            setHasMore(books.length >= limit - 1);
            if (books.length > 0) {
                setBooksDetails(prev => [...prev, ...books.slice(0, limit - 1)]);
            }
            return true;
        } catch (err) {
            // on any fetch error, stop attempting to load more and end the carousel
            console.error("BookScroll loadMore error:", err);
            setHasMore(false);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const nextPage = async () => {
        const cardWidth = getCardWidth();
        if (!cardWidth) return;
        const amount = Math.round(cardWidth * Math.max(1, visibleCards - 1));
        const el = scrollRef.current;
        if (!el) return;

        const remaining = el.scrollWidth - (el.scrollLeft + el.clientWidth);
        if (remaining < cardWidth * (visibleCards + 1) && HasMore) {
            const ok = await loadMore();
            if (!ok) return; // don't scroll forward if load failed
        }

        scroll(amount);
    };

    const prevPage = () => {
        const cardWidth = getCardWidth();
        if (!cardWidth) return;
        const amount = Math.round(cardWidth * Math.max(1, visibleCards - 1));
        scroll(-amount);
    };

    useEffect(() => {
        // reset when PreBooks changes
        setBooksDetails(PreBooks || []);
        setStart(0);
        setHasMore(true);
        setLoading(false);
    }, [PreBooks]);

    useEffect(() => {
        if (!PreBooks || PreBooks.length === 0) loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Title, visibleCards]);

    // Ensure we attempt an initial load on mount when no PreBooks provided.
    useEffect(() => {
        if ((!PreBooks || PreBooks.length === 0) && BooksDetails.length === 0) {
            // fire-and-forget; loadMore will update state when complete
            loadMore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="book-scroll-section">
            <h4 className="discover-page-book-scroll-title">{Title}</h4>
            <div className="books-section">
                {showLeft && (
                    <button className={"scroll-btn left"} onClick={prevPage}>
                        <FaChevronLeft />
                    </button>
                )}
                <div className="books-scroll-cards" ref={scrollRef} onWheel={handleWheel}>
                    {BooksDetails && BooksDetails.length > 0 ? (
                        BooksDetails.map(bookdetails => (
                            <BookCard key={bookdetails.bookId} BookId={bookdetails.bookId} Source="discover" />
                        ))
                    ) : (
                        Array.from({ length: Math.max(visibleCards + 1, 5) }).map((_, i) => (
                            <div key={"ph" + i} className="book-card placeholder" />
                        ))
                    )}
                </div>
                {showRight && (
                    <button className={"scroll-btn right"} onClick={nextPage} disabled={Loading}>
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookScroll;