import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Library.css";
import axios from "axios";

const PAGE = 12;
const FILTER_STATUS = {
  all: "all",
  reading: "reading",
  completed: "completed",
  unread: "owned",
};

const sectionBooks = (sections, title) => {
  const section = sections.find((item) => item.title === title);
  if (!section?.books) return [];
  return Array.isArray(section.books) ? section.books.filter(Boolean) : [section.books];
};

const Library = ({ LoggedIn }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

  const [books, setBooks] = useState([]);
  const [ContinueReadingBook, setContinueReadingBook] = useState(null);
  const [Filter, setFilter] = useState("all");
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const authHeaders = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const getLibraryBooks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        setLoading(true);
        const libraryResponse = await axios.get(`${API_URL}/library/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sections = Array.isArray(libraryResponse.data) ? libraryResponse.data : [];
        const reading = sectionBooks(sections, "Continue-Reading");
        const all = sectionBooks(sections, "all");

        setContinueReadingBook(reading[0] || null);
        setBooks(all);
        setStart(0);
        setHasMore(all.length >= PAGE);
        setFilter("all");
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (LoggedIn) getLibraryBooks();
  }, [API_URL, LoggedIn]);

  const loadPage = async (nextFilter, offset, append) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/library/myBooks`, {
        params: {
          limit: PAGE,
          start: offset,
          status: FILTER_STATUS[nextFilter],
        },
        headers: authHeaders(),
      });
      const page = Array.isArray(response.data?.books) ? response.data.books.filter(Boolean) : [];
      setFilter(nextFilter);
      setStart(offset);
      setHasMore(page.length >= PAGE);
      setBooks((prev) => {
        if (!append) return page;
        const seen = new Set(prev.map((book) => String(book.bookId)));
        return [...prev, ...page.filter((book) => !seen.has(String(book.bookId)))];
      });
    } catch (err) {
      console.log(err.message);
      if (!append) setBooks([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const openBook = (bookId) => {
    navigate(`/readbook/${bookId}`);
  };

  return (
    <div className="library-page">
      <div className="page-shell">
        <h1 className="page-heading">Library</h1>
        <p className="page-sub">Your books, reading progress, and finished titles.</p>

        {!LoggedIn ? (
          <div className="empty-card">
            <h2>Log in to view your library</h2>
            <p>Owned books and continue reading appear here after you sign in.</p>
          </div>
        ) : (
          <div className="owned-books-section">
            {ContinueReadingBook && (
              <section className="continue-reading-section">
                <p className="continue-kicker">Still open</p>
                <div className="continue-reading-book">
                  <button
                    type="button"
                    className="continue-reading-image"
                    onClick={() => openBook(ContinueReadingBook.bookId)}
                  >
                    <img
                      src={ContinueReadingBook.coverImage}
                      alt={ContinueReadingBook.title}
                    />
                  </button>
                  <div className="continue-reading-details">
                    <h2>Continue reading</h2>
                    <p className="owned-books-name">{ContinueReadingBook.title}</p>
                    <p className="owned-books-author">{ContinueReadingBook.author}</p>
                    <p className="continue-copy">
                      You left this one mid-chapter. Pick it up again — the page is still waiting.
                    </p>
                    <button
                      type="button"
                      className="continue-read-btn"
                      onClick={() => openBook(ContinueReadingBook.bookId)}
                    >
                      Continue reading
                    </button>
                  </div>
                </div>
              </section>
            )}

            <div className="library-filters">
              <button className={Filter === "all" ? "active-filter" : ""} onClick={() => loadPage("all", 0, false)}>All</button>
              <button className={Filter === "reading" ? "active-filter" : ""} onClick={() => loadPage("reading", 0, false)}>Currently Reading</button>
              <button className={Filter === "completed" ? "active-filter" : ""} onClick={() => loadPage("completed", 0, false)}>Completed</button>
              <button className={Filter === "unread" ? "active-filter" : ""} onClick={() => loadPage("unread", 0, false)}>Not Started</button>
            </div>

            {books.length === 0 && !loading ? (
              <div className="empty-card">
                <h2>No books here yet</h2>
                <p>Buy a book from Discover to add it to your library.</p>
              </div>
            ) : (
              <div className="owned-books-grid">
                {books.map((book) => (
                  <div
                    key={book.bookId}
                    className="owned-books-card"
                    onClick={() => openBook(book.bookId)}
                  >
                    <img src={book.coverImage} alt={book.title} />
                    <div className="owned-books-details">
                      <p className="owned-books-name">{book.title}</p>
                      <p className="owned-books-author">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasMore && (
              <button
                type="button"
                className="library-more"
                onClick={() => loadPage(Filter, start + PAGE, true)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
