import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import books from "../../data/books.js";
import "./Library.css";

const Library = ({ LoggedIn }) => {
  const navigate = useNavigate();

  const [OwnedBookIds, setOwnedBookIds] = useState(
    JSON.parse(localStorage.getItem("ownedBooks")) || []
  );

  const [ReadingProgress, setReadingProgress] = useState(
    JSON.parse(localStorage.getItem("readingProgress")) || {}
  );

  const [LastReadBook, setLastReadBook] = useState(
    JSON.parse(localStorage.getItem("lastReadBook")) || null
  );

  const [Filter, setFilter] = useState("all");

  useEffect(() => {
    const ownedBooks =
      JSON.parse(localStorage.getItem("ownedBooks")) || [];

    const progress =
      JSON.parse(localStorage.getItem("readingProgress")) || {};

    const lastRead =
      JSON.parse(localStorage.getItem("lastReadBook")) || null;

    setOwnedBookIds(ownedBooks);
    setReadingProgress(progress);
    setLastReadBook(lastRead);
  }, []);

  const getProgress = (bookId) => {
    return ReadingProgress[bookId] || 0;
  };

  const filteredBooks = OwnedBookIds.filter((bookId) => {
    const progress = getProgress(bookId);

    if (Filter === "completed") {
      return progress === 100;
    }

    if (Filter === "reading") {
      return progress > 0 && progress < 100;
    }

    if (Filter === "unread") {
      return progress === 0;
    }

    return true;
  });

  const LastReadBookData = books.find(
    (book) => book.bookId === LastReadBook
  );

  const openBook = (bookId) => {
    navigate(`/readbook/${bookId}`);
  };

  return (
    <div>
      Library

      {!LoggedIn ? (
        <p>log in to access features</p>
      ) : (
        <div className="owned-books-section">

          {/* Continue Reading */}
          {LastReadBookData && (
  <div className="continue-reading-section">
    <h2>Continue Reading</h2>

    <div className="continue-reading-book">
      <div
        className="continue-reading-image"
        onClick={() => openBook(LastReadBookData.bookId)}
      >
        <img
          src={LastReadBookData.coverImage}
          alt={LastReadBookData.title}
        />
      </div>

      <div
        className="continue-reading-details"
        onClick={() => openBook(LastReadBookData.bookId)}
      >
        <p className="owned-books-name">
          {LastReadBookData.title}
        </p>

        <p className="owned-books-author">
          {LastReadBookData.author}
        </p>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${getProgress(LastReadBookData.bookId)}%`,
            }}
          ></div>
        </div>

        <p>
          {getProgress(LastReadBookData.bookId)}% completed
        </p>
      </div>
    </div>
  </div>
)}

          {/* Filters */}
          <div className="library-filters">
            <button
              className={Filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={Filter === "reading" ? "active-filter" : ""}
              onClick={() => setFilter("reading")}
            >
              Currently Reading
            </button>

            <button
              className={Filter === "completed" ? "active-filter" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button
              className={Filter === "unread" ? "active-filter" : ""}
              onClick={() => setFilter("unread")}
            >
              Not Started
            </button>
          </div>

          {/* Books */}
          <div className="owned-books-grid">
            {filteredBooks.map((ownedbooksid) => {
              const book = books.find(
                (book) => book.bookId === ownedbooksid
              );

              if (!book) return null;

              const progress = getProgress(ownedbooksid);

              return (
                <div
                  key={ownedbooksid}
                  className="owned-books-card"
                  onClick={() => openBook(book.bookId)}
                >
                  <img
                    src={book.coverImage}
                    alt={book.title}
                  />

                  <div className="owned-books-details">
                    <p className="owned-books-name">
                      {book.title}
                    </p>

                    <p className="owned-books-author">
                      {book.author}
                    </p>

                    {/* Only show progress when Currently Reading is selected */}
                    {Filter === "reading" && (
                      <>
                        <div className="progress-container">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${progress}%`,
                            }}
                          ></div>
                        </div>

                        <p className="progress-text">
                          {progress}% completed
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default Library;