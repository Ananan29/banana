import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Discover.css";
import BookScroll from "../../Components/BookScroll/BookScroll.jsx";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { estimateShelfFit } from "../../utils/shelfMetrics.js";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const FEATURED_GENRES = ["fantasy", "young-adult", "action", "mystery", "biography"];
const HERO_FALLBACK_COVERS = [
  "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg",
  "https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg",
  "https://covers.openlibrary.org/b/isbn/9780553386790-L.jpg",
  "https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg",
  "https://covers.openlibrary.org/b/isbn/9780316015844-L.jpg",
];

const Discover = ({ LoggedIn }) => {
  const navigate = useNavigate();
  const [BooksDetails, setBooksDetails] = useState([]);
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingShelves, setLoadingShelves] = useState(true);
  const [heroBooks, setHeroBooks] = useState([]);
  const [shelfPageSize, setShelfPageSize] = useState(() => estimateShelfFit().pageSize);
  const searchRef = useRef(null);

  useEffect(() => {
    const getHeroBooks = async () => {
      try {
        const response = await axios.get(`${API}/dashboard/hero`, {
          params: { t: Date.now() },
        });
        setHeroBooks(Array.isArray(response.data) ? response.data.slice(0, 5) : []);
      } catch (err) {
        console.log(err.message);
      }
    };
    getHeroBooks();
  }, []);

  useEffect(() => {
    const getBooks = async () => {
      setLoadingShelves(true);
      const { pageSize } = estimateShelfFit();
      setShelfPageSize(pageSize);
      try {
        let response;
        if (LoggedIn) {
          const token = localStorage.getItem("authToken");
          if (!token) {
            setLoadingShelves(false);
            return;
          }
          response = await axios.get(`${API}/dashboard/personalized`, {
            params: { limit: pageSize, start: 0 },
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          response = await axios.get(`${API}/dashboard`, {
            params: { limit: pageSize, start: 0 },
          });
        }
        setBooksDetails(
          (response.data || []).filter((section) => {
            if (Array.isArray(section.books)) return section.books.length !== 0;
            return Boolean(section.books);
          })
        );
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoadingShelves(false);
      }
    };
    getBooks();
  }, [LoggedIn]);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setDropdown([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await axios.get(`${API}/search`, {
          params: { q, limit: 5, start: 0 },
        });
        const page = Array.isArray(response.data)
          ? response.data
          : (response.data?.books || []);
        setDropdown(page);
        setShowDropdown(true);
      } catch (err) {
        setDropdown([]);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const runFullSearch = (e) => {
    e?.preventDefault?.();
    const q = query.trim();
    if (!q) return;
    setShowDropdown(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  const openBook = (bookId) => {
    setShowDropdown(false);
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="discover-page">
      <section className="discover-hero">
        <div className="discover-hero-copy">
        <p className="discover-kicker">Discover</p>
        <h1 className="discover-title">
          {LoggedIn ? (
            <>Your next <em>chapter</em> is waiting</>
          ) : (
            <>Find a book you’ll <em>stay up</em> for</>
          )}
        </h1>
        <p className="discover-lead">
          Search the shelves, browse genres, or scroll curated lists from the catalog.
        </p>

        <div className="discover-search-panel">
          <form className="search-bar-area" onSubmit={runFullSearch} ref={searchRef}>
            <div className="search-wrap">
              <FiSearch className="search-icon" aria-hidden="true" />
              <input
                className="search-input"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  if (dropdown.length > 0) setShowDropdown(true);
                }}
                placeholder="Search books, authors, genres..."
              />
              {showDropdown && dropdown.length > 0 && (
                <div className="search-dropdown">
                  {dropdown.map((book) => (
                    <button
                      type="button"
                      key={book.bookId}
                      className="search-dropdown-item"
                      onClick={() => openBook(book.bookId)}
                    >
                      {book.coverImage && <img src={book.coverImage} alt="" />}
                      <span>
                        <strong>{book.title}</strong>
                        <em>{book.author}</em>
                      </span>
                    </button>
                  ))}
                  <button type="submit" className="search-dropdown-more">
                    See all results
                  </button>
                </div>
              )}
            </div>
            <button className="search-button" type="submit">
              Search
            </button>
          </form>

          <div className="discover-chips">
            <span className="discover-chips-label">Browse</span>
            {FEATURED_GENRES.map((genre) => (
              <button
                type="button"
                key={genre}
                className="discover-chip"
                onClick={() => navigate(`/genre/${encodeURIComponent(genre)}`)}
              >
                {genre.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>
        </div>

        <div className="discover-hero-art">
          {(heroBooks.length > 0 ? heroBooks : HERO_FALLBACK_COVERS.map((coverImage) => ({ coverImage }))).map((book, index) => {
            const CoverTag = book.bookId ? "button" : "div";
            return (
              <CoverTag
                key={book.bookId || book.coverImage}
                type={book.bookId ? "button" : undefined}
                className={`hero-cover hero-cover-${index + 1}`}
                onClick={book.bookId ? () => openBook(book.bookId) : undefined}
              >
                <img src={book.coverImage} alt={book.title || ""} />
              </CoverTag>
            );
          })}
        </div>
      </section>

      {loadingShelves ? (
        <div className="discover-skeletons">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`loading-${i}`} className="discover-skeleton-row">
              <div className="discover-skeleton-title" />
              <div className="discover-skeleton-cards">
                {Array.from({ length: 6 }).map((__, j) => (
                  <div key={j} className="discover-skeleton-card" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : BooksDetails.length === 0 ? (
        <div className="search-results">
          <div className="empty-card">
            <h2>The shelves are empty</h2>
            <p>Check back soon or try searching for a title.</p>
          </div>
        </div>
      ) : (
        BooksDetails.map((section) => (
          <BookScroll
            key={section.title}
            Title={section.title}
            pageSize={shelfPageSize}
            PreBooks={Array.isArray(section.books) ? section.books : [section.books]}
          />
        ))
      )}
    </div>
  );
};

export default Discover;
