import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";

// import books from "../../data/books.js"; // NOT USED — books now come from backend
import "./Library.css";
import axios from "axios";

const Library = ({ LoggedIn }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [LibraryBooks, setLibraryBooks] = useState([]);
  const [ContinueReadingBook, setContinueReadingBook] = useState(null);

  // All books that are currently being read
  const [ReadingBooks, setReadingBooks] = useState([]);

  const [Filter, setFilter] = useState("all");

  useEffect(() => {
    const getLibraryBooks = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          return;
        }

        /*
          Get the normal library data.

          Backend returns:

          Continue-Reading
          owned
          completed
        */
        const libraryResponse = await axios.get(
          `${API_URL}/library/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Library:", libraryResponse.data);

        setLibraryBooks(libraryResponse.data);

        /*
          IMPORTANT:

          /library/ currently returns only:

          result[0][0]

          for Continue-Reading.

          Therefore, it only gives us ONE reading book.

          We separately request ALL reading books from
          /library/myBooks.
        */
        const readingResponse = await axios.get(
          `${API_URL}/library/myBooks?limit=10&start=0&status=reading`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Reading books:", readingResponse.data);

        const readingBooks =
          readingResponse.data?.books || [];

        setReadingBooks(readingBooks);

        /*
          Continue Reading section keeps its existing UI
          and displays the first currently-reading book.
        */
        setContinueReadingBook(
          readingBooks.length > 0
            ? readingBooks[0]
            : null
        );

      } catch (err) {
        console.log(err.message);
      }
    };

    getLibraryBooks();
  }, [API_URL]);

  /*
    Backend "owned" = books that have NOT been started.
  */
  const OwnedBooks =
    LibraryBooks.find(
      section => section.title === "owned"
    )?.books || [];

  /*
    Completed books.
  */
  const CompletedBooks =
    LibraryBooks.find(
      section => section.title === "completed"
    )?.books || [];

  /*
    Old progress system — NOT USED because the backend now
    determines the book status.

    const getProgress = (bookId) => {
      return ReadingProgress[bookId] || 0;
    };
  */

  /*
    Old local-book system — NOT USED.

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
  */

  /*
    ALL BOOKS

    A book can be in:

    - owned
    - reading
    - completed

    Once a book is opened, it moves from owned -> reading.

    Therefore reading books MUST be included here.
  */
  const AllBooks = [
    ...OwnedBooks,
    ...ReadingBooks,
    ...CompletedBooks
  ];

  /*
    Remove duplicates by bookId.
  */
  const UniqueAllBooks = AllBooks.filter(
    (book, index, array) =>
      book &&
      index ===
        array.findIndex(
          item => item.bookId === book.bookId
        )
  );

  /*
    Filter books.
  */
  let filteredBooks = [];

  if (Filter === "completed") {

    filteredBooks = CompletedBooks;

  } else if (Filter === "reading") {

    filteredBooks = ReadingBooks;

  } else if (Filter === "unread") {

    /*
      "owned" means the book has not been started.
    */
    filteredBooks = OwnedBooks;

  } else {

    /*
      All =

      Not Started
      +
      Currently Reading
      +
      Completed
    */
    filteredBooks = UniqueAllBooks;
  }

  /*
    Old local data — NOT USED anymore.

    const LastReadBookData = books.find(
      (book) => book.bookId === LastReadBook
    );
  */

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
          {ContinueReadingBook && (
            <div className="continue-reading-section">
              <h2>Continue Reading</h2>

              <div className="continue-reading-book">

                <div
                  className="continue-reading-image"
                  onClick={() =>
                    openBook(
                      ContinueReadingBook.bookId
                    )
                  }
                >
                  <img
                    src={ContinueReadingBook.coverImage}
                    alt={ContinueReadingBook.title}
                  />
                </div>

                <div
                  className="continue-reading-details"
                  onClick={() =>
                    openBook(
                      ContinueReadingBook.bookId
                    )
                  }
                >
                  <p className="owned-books-name">
                    {ContinueReadingBook.title}
                  </p>

                  <p className="owned-books-author">
                    {ContinueReadingBook.author}
                  </p>

                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${
                          ContinueReadingBook.progress || 0
                        }%`,
                      }}
                    ></div>
                  </div>

                  <p>
                    {ContinueReadingBook.progress || 0}% completed
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Filters */}
          <div className="library-filters">

            <button
              className={
                Filter === "all"
                  ? "active-filter"
                  : ""
              }
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={
                Filter === "reading"
                  ? "active-filter"
                  : ""
              }
              onClick={() => setFilter("reading")}
            >
              Currently Reading
            </button>

            <button
              className={
                Filter === "completed"
                  ? "active-filter"
                  : ""
              }
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button
              className={
                Filter === "unread"
                  ? "active-filter"
                  : ""
              }
              onClick={() => setFilter("unread")}
            >
              Not Started
            </button>

          </div>

          {/* Books */}
          <div className="owned-books-grid">

            {filteredBooks.map((book) => {

              if (!book) return null;

              return (
                <div
                  key={book.bookId}
                  className="owned-books-card"
                  onClick={() =>
                    openBook(book.bookId)
                  }
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
                              width: `${
                                book.progress || 0
                              }%`,
                            }}
                          ></div>

                        </div>

                        <p className="progress-text">
                          {book.progress || 0}% completed
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