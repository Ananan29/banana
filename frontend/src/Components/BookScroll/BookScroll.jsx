import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import BookCard from "./../BookCard/BookCard.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BookScroll.css";
import axios from "axios";
import {
    getShelfState,
    seedShelfBooks,
    mergeShelfPage,
    setShelfStart,
    setShelfFetchSize,
} from "../../utils/shelfPagination.js";
import { estimateShelfFit, measureShelfFit } from "../../utils/shelfMetrics.js";

const BOOK_LIST_TITLES = ["Top-Rated", "Recently-Added", "New-Releases", "Recommended-Books"];
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const fetchShelfPage = async (Title, start, limit) => {
    const token = localStorage.getItem("authToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    let url;

    if (Title === "Reading") {
        url = `${API_URL}/library/myBooks?limit=${limit}&start=${start}&status=reading`;
    } else if (BOOK_LIST_TITLES.includes(Title)) {
        url = `${API_URL}/book/${Title}?limit=${limit}&start=${start}`;
    } else {
        url = `${API_URL}/genre/${encodeURIComponent(Title)}?limit=${limit}&start=${start}`;
    }

    const response = await axios.get(url, { headers });
    return Array.isArray(response.data) ? response.data : (response.data.books || []);
};

const BookScroll = ({ Title, PreBooks, pageSize }) => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const basePadRightRef = useRef(null);
    const loadPromiseRef = useRef(null);
    const pendingScrollRef = useRef(0);
    const animRef = useRef(0);
    const movingRef = useRef(false);
    const initialSize = pageSize || estimateShelfFit().pageSize;
    const [books, setBooks] = useState([]);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const lockPeek = () => {
        const el = scrollRef.current;
        if (!el) return null;
        if (basePadRightRef.current == null) {
            basePadRightRef.current = parseFloat(getComputedStyle(el).paddingRight) || 0;
        }
        el.style.paddingRight = `${basePadRightRef.current}px`;
        const measured = measureShelfFit(el);
        if (!measured) return null;
        el.style.paddingRight = `${basePadRightRef.current + measured.extraPadRight}px`;
        setShelfFetchSize(Title, measured.pageSize);
        return measured;
    };

    const getMetrics = () => lockPeek();

    const jumpTo = (el, left) => {
        animRef.current += 1;
        movingRef.current = false;
        el.style.scrollBehavior = "auto";
        el.scrollLeft = left;
        el.style.removeProperty("scroll-behavior");
        syncEdges(el);
    };

    const syncEdges = (el = scrollRef.current) => {
        if (!el) return;
        const max = Math.max(0, el.scrollWidth - el.clientWidth);
        setAtStart(el.scrollLeft <= 8);
        setAtEnd(max - el.scrollLeft <= 8);
    };

    const animateScroll = (el, to, onDone) => {
        const from = el.scrollLeft;
        const max = Math.max(0, el.scrollWidth - el.clientWidth);
        const target = Math.max(0, Math.min(to, max));
        if (Math.abs(target - from) < 1) {
            movingRef.current = false;
            syncEdges(el);
            if (onDone) onDone();
            return;
        }
        const token = ++animRef.current;
        movingRef.current = true;
        const start = performance.now();
        const tick = (now) => {
            if (token !== animRef.current) return;
            const t = Math.min(1, (now - start) / 280);
            const ease = 1 - (1 - t) * (1 - t) * (1 - t);
            el.scrollLeft = from + (target - from) * ease;
            if (t < 1) requestAnimationFrame(tick);
            else {
                movingRef.current = false;
                syncEdges(el);
                if (onDone) onDone();
            }
        };
        requestAnimationFrame(tick);
    };

    const loadRange = (start, limit) => {
        const cursor = getShelfState(Title);
        if (cursor.exhausted && start >= cursor.books.length) return Promise.resolve(false);

        const run = async () => {
            try {
                const page = await fetchShelfPage(Title, start, limit);
                const next = mergeShelfPage(Title, page, start);
                setBooks(next);
                return page.length > 0;
            } catch (err) {
                console.error("BookScroll load error:", err);
                return false;
            }
        };

        const pending = (loadPromiseRef.current || Promise.resolve()).then(run, run);
        loadPromiseRef.current = pending;
        pending.finally(() => {
            if (loadPromiseRef.current === pending) loadPromiseRef.current = null;
        });
        return pending;
    };

    useLayoutEffect(() => {
        const apply = () => {
            lockPeek();
            syncEdges();
        };
        apply();
        window.addEventListener("resize", apply);
        return () => window.removeEventListener("resize", apply);
    }, [books, Title]);

    useEffect(() => {
        if (!pendingScrollRef.current) return;
        const amount = pendingScrollRef.current;
        pendingScrollRef.current = 0;
        const el = scrollRef.current;
        if (!el) return;
        animateScroll(el, el.scrollLeft + amount);
    }, [books]);

    useEffect(() => {
        const seeded = seedShelfBooks(Title, PreBooks, initialSize);
        if (seeded.length > 0) {
            setBooks(seeded);
            return;
        }
        loadRange(0, initialSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Title, PreBooks, initialSize]);

    const nextPage = async () => {
        if (movingRef.current) return;
        const metrics = getMetrics();
        if (!metrics) return;
        const { el, stepPx, stepBooks, pageSize: limit } = metrics;
        const state = getShelfState(Title);
        const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
        const remaining = maxScroll - el.scrollLeft;
        const nextIndex = state.start + stepBooks;
        const needWait = remaining < stepPx - 8 && !state.exhausted;

        if (needWait) {
            pendingScrollRef.current = stepPx;
            setShelfStart(Title, nextIndex);
            await loadRange(state.nextStart, limit);
            return;
        }

        if (!state.exhausted && remaining < stepPx * 2) {
            loadRange(state.nextStart, limit);
        }

        if (remaining > 8) {
            setShelfStart(Title, nextIndex);
            animateScroll(el, el.scrollLeft + stepPx);
        }
    };

    const prevPage = async () => {
        if (movingRef.current) return;
        const metrics = getMetrics();
        if (!metrics) return;
        const { el, stepPx, stepBooks, pageSize: limit } = metrics;
        const state = getShelfState(Title);

        if (el.scrollLeft <= 8 || state.start <= 0) {
            setShelfStart(Title, 0);
            animateScroll(el, 0);
            return;
        }

        const newStart = Math.max(0, state.start - stepBooks);
        setShelfStart(Title, newStart);

        if (newStart === 0) {
            animateScroll(el, 0);
            return;
        }

        loadRange(newStart, limit);
        animateScroll(el, el.scrollLeft - stepPx);
    };

    const openSeeAll = () => {
        if (Title === "Reading") {
            navigate("/library");
            return;
        }
        if (BOOK_LIST_TITLES.includes(Title)) {
            navigate(`/list/${encodeURIComponent(Title)}`);
            return;
        }
        navigate(`/genre/${encodeURIComponent(Title)}`);
    };

    return (
        <div className="book-scroll-section">
            <div className="book-scroll-header">
                <h4 className="discover-page-book-scroll-title is-link" onClick={openSeeAll}>
                    {Title.replace(/-/g, " ")}
                </h4>
                <button type="button" className="book-scroll-see-all" onClick={openSeeAll}>
                    See all
                </button>
            </div>
            <div className="books-section">
                <button type="button" className="scroll-btn left" onClick={prevPage} disabled={atStart} aria-label="Previous books">
                    <FaChevronLeft />
                </button>
                <div className="books-scroll-cards" ref={scrollRef}>
                    {books.length > 0 ? (
                        books.map((bookdetails) => (
                            <BookCard
                                key={bookdetails.bookId}
                                BookId={bookdetails.bookId}
                                Source="discover"
                                Book={bookdetails}
                            />
                        ))
                    ) : (
                        Array.from({ length: initialSize }).map((_, i) => (
                            <div key={"ph" + i} className="book-card placeholder" />
                        ))
                    )}
                </div>
                <button type="button" className="scroll-btn right" onClick={nextPage} disabled={atEnd && getShelfState(Title).exhausted} aria-label="Next books">
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default BookScroll;
