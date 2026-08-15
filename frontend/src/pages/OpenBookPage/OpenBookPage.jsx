import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import ownedbooks from "./../../data/ownedbooks.js"; // NOT USED — data now comes from backend
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./OpenBookPage.css";
import axios from "axios";

const OpenBookPage = ({ onShowNavBar, ShowNavBar }) => {
    const { BookId } = useParams();

    const API_URL = import.meta.env.VITE_API_URL;

    const [readerNavVisible, setReaderNavVisible] = useState(false);

    // Old local book data — NOT USED anymore
    // const openbook = ownedbooks.find(book => book.bookId === BookId);

    /*
    Old local chapter data — NOT USED anymore.

    const [currChapter, setcurrChapter] = useState(openbook.chapters[0]);

    const [currChapterText, setcurrChapterText] = useState(
        openbook.chapterTexts[currChapter]
    );
    */

    const [currChapter, setcurrChapter] = useState(1);
    const [currChapterText, setcurrChapterText] = useState("");

    const [totalChapters, setTotalChapters] = useState(1);

    const [BookDetails, setBookDetails] = useState({
        title: "",
        author: "",
        totalChapters: 1,
    });

    const [currFont, setcurrFont] = useState(5);
    const [ShowOptions, setShowOptions] = useState(false);
    const [Mode, setMode] = useState(false);
    const [PageChangeMode, setPageChangeMode] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    /*
    Old localStorage reading progress — NOT USED anymore.

    const [ReadingProgress, setReadingProgress] = useState(
        JSON.parse(localStorage.getItem("readingProgress")) || {}
    );
    */

    const [ReadingProgress, setReadingProgress] = useState(0);

    // Show only first 10 chapters initially
    const [ShowAllChapters, setShowAllChapters] = useState(false);

    const navigate = useNavigate();
    const optionsRef = useRef(null);

    const GoBack = () => {
        navigate(-1);
    };

    const openOptions = () => {
        setShowOptions(!ShowOptions);
    };

    const askAI = () => { };

    const changePageChangeMode = () => {
        setPageChangeMode(!PageChangeMode);
    };

    /*
    Old local chapter-changing function — NOT USED.

    const changeChapter = (chapter) => {
        setcurrChapter(chapter);

        const chapterIndex = openbook.chapters.indexOf(chapter);

        const progress = Math.round(
            (chapterIndex / (openbook.chapters.length - 1)) * 100
        );

        const newProgress = {
            ...ReadingProgress,
            [BookId]: progress
        };

        setReadingProgress(newProgress);

        localStorage.setItem(
            "readingProgress",
            JSON.stringify(newProgress)
        );

        localStorage.setItem(
            "lastReadBook",
            JSON.stringify(BookId)
        );
    };
    */

    /*
    Backend version.

    The backend expects:

    /library/readBook?bookId=BOOK_ID&order=CHAPTER_ORDER

    It also updates the user's readingOrder in the database.
    */
    const changeChapter = async (chapter) => {
        try {
            const token = localStorage.getItem("authToken");

            if (!token) {
                return;
            }

            const response = await axios.get(
                `${API_URL}/library/readBook`,
                {
                    params: {
                        bookId: BookId,
                        order: chapter
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setcurrChapter(response.data.order);
            setcurrChapterText(response.data.content || "");

            if (response.data.totalOrder) {
                setTotalChapters(response.data.totalOrder);
            }

            const currentOrder = response.data.order;

            const totalOrder =
                response.data.totalOrder ||
                totalChapters ||
                BookDetails.totalChapters ||
                1;

            const progress = Math.round(
                (currentOrder / totalOrder) * 100
            );

            setReadingProgress(progress);

            setPageIndex(0);

        } catch (err) {
            console.log(
                err.response?.data || err.message
            );
        }
    };

    const changeMode = () => {
        setMode(!Mode);
    };

    const [readingMode, setReadingMode] = useState("scroll");

    const toggleReadingMode = () => {
        setReadingMode((prev) =>
            prev === "scroll" ? "flip" : "scroll"
        );

        setPageIndex(0);
    };

    const chapterPages = currChapterText
        ? currChapterText
            .split(/\s+/)
            .reduce((pages, word, index) => {
                const pageIndexForWord = Math.floor(index / 120);

                if (!pages[pageIndexForWord]) {
                    pages[pageIndexForWord] = [];
                }

                pages[pageIndexForWord].push(word);

                return pages;
            }, [])
            .map((pageWords) => pageWords.join(" "))
        : [""];

    const currentPageText =
        chapterPages[pageIndex] || "";

    const goToPreviousPage = () => {
        setPageIndex((prev) =>
            Math.max(prev - 1, 0)
        );
    };

    const goToNextPage = () => {
        setPageIndex((prev) =>
            Math.min(
                prev + 1,
                chapterPages.length - 1
            )
        );
    };

    const increaseFont = () => {
        if (currFont == 10) return;

        setcurrFont(currFont + 1);
    };

    const decreaseFont = () => {
        if (currFont == 0) return;

        setcurrFont(currFont - 1);
    };

    /*
    Get book details and total chapter count from backend.

    /api/book/:BookId returns:
    - title
    - author
    - totalChapters
    - etc.
    */
    useEffect(() => {
        const getBookAndChapterDetails = async () => {
            try {
                const token =
                    localStorage.getItem("authToken");

                /*
                First get the book details.

                This gives us totalChapters even when
                the readBook endpoint only returns one
                chapter.
                */
                const bookResponse = await axios.get(
                    `${API_URL}/book/${BookId}`,
                    {
                        headers: token
                            ? {
                                Authorization: `Bearer ${token}`
                            }
                            : {}
                    }
                );

                console.log(
                    "Book details:",
                    bookResponse.data
                );

                const bookTotalChapters =
                    bookResponse.data.totalChapters || 1;

                setBookDetails({
                    title: bookResponse.data.title || "",
                    author: bookResponse.data.author || "",
                    totalChapters: bookTotalChapters
                });

                setTotalChapters(bookTotalChapters);

                /*
                Now get the user's current chapter.

                If the book is already being read,
                the backend uses the saved currentOrder.

                If the book hasn't been started yet,
                the backend returns 404 because currentOrder
                is 0. In that case we request Chapter 1.
                */
                let response;

                try {
                    response = await axios.get(
                        `${API_URL}/library/readBook`,
                        {
                            params: {
                                bookId: BookId
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                } catch (err) {
                    if (err.response?.status !== 404) {
                        throw err;
                    }

                    response = await axios.get(
                        `${API_URL}/library/readBook`,
                        {
                            params: {
                                bookId: BookId,
                                order: 1
                            },
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                }

                console.log(
                    "Current chapter:",
                    response.data
                );

                setcurrChapter(
                    response.data.order || 1
                );

                setcurrChapterText(
                    response.data.content || ""
                );

                /*
                readBook with an order does not currently
                return totalOrder, so use the value from
                the book endpoint if necessary.
                */
                const backendTotal =
                    response.data.totalOrder ||
                    bookTotalChapters;

                setTotalChapters(backendTotal);

                const currentOrder =
                    response.data.order || 1;

                const progress = Math.round(
                    (currentOrder / backendTotal) * 100
                );

                setReadingProgress(progress);

                setPageIndex(0);

                // Reset chapter list to collapsed
                setShowAllChapters(false);

            } catch (err) {
                console.log(
                    err.response?.data || err.message
                );
            }
        };

        getBookAndChapterDetails();
    }, [BookId]);

    /*
    Old local chapter text effect — NOT USED.

    useEffect(() => {
        const nextText =
            openbook.chapterTexts[currChapter] || "";

        setcurrChapterText(nextText);
        setPageIndex(0);
    }, [currChapter]);
    */

    /*
    Old localStorage progress effect — NOT USED.

    useEffect(() => {
        const progress =
            JSON.parse(
                localStorage.getItem("readingProgress")
            ) || {};

        setReadingProgress(progress);
    }, []);
    */

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                optionsRef.current &&
                !optionsRef.current.contains(event.target)
            ) {
                setShowOptions(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    useEffect(() => {
        onShowNavBar(false);
        setReaderNavVisible(false);

        return () => {
            onShowNavBar(true);
        };
    }, []);

    /*
    Old localStorage progress:

    const currentProgress =
        ReadingProgress[BookId] || 0;

    Now ReadingProgress itself is the percentage
    calculated from backend readingOrder.
    */
    const currentProgress = ReadingProgress || 0;

    const toggleReaderNav = () => {
        setReaderNavVisible((prev) => !prev);
    };

    /*
    The backend provides totalChapters through the
    Book endpoint.

    We create the chapter numbers from 1 -> totalChapters.

    Only the first 10 are shown initially.
    */
    const chapters = Array.from(
        { length: totalChapters },
        (_, index) => index + 1
    );

    const visibleChapters = ShowAllChapters
        ? chapters
        : chapters.slice(0, 10);

    return (
        <>
            {readerNavVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 200
                    }}
                >
                    <Navbar
                        ShowAuth={() => { }}
                        LoggedIn={true}
                    />
                </div>
            )}

            <div
                className={`open-book-page ${Mode ? "dark-mode" : ""
                    }`}
            >

                {/* Header */}

                <div className="book-header">

                    {/* Back */}

                    <button
                        className="back-button"
                        onClick={GoBack}
                    >
                        {"﹤"}
                    </button>


                    {/* Title */}

                    <div className="book-heading">
                        <p className="book-title">
                            {BookDetails.title}
                        </p>
                    </div>


                    {/* Author */}

                    <div className="header-info">
                        <p className="book-author">
                            {BookDetails.author}
                        </p>
                    </div>


                    {/* Ask AI + Options */}

                    <div className="header-right">

                        <button
                            className="askAI-button"
                            onClick={askAI}
                        >
                            Ask AI
                        </button>

                        <div
                            className="reader-options-wrapper"
                            ref={optionsRef}
                        >
                            <button
                                className="options-button"
                                onClick={openOptions}
                            >
                                ⋮
                            </button>

                            {ShowOptions && (
                                <div className="reader-options-menu">
                                    <button
                                        type="button"
                                        className="reader-option-row"
                                        onClick={
                                            toggleReadingMode
                                        }
                                    >
                                        <span className="reader-option-label">
                                            Page change style:
                                        </span>

                                        <span>
                                            {readingMode}
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>


                    {/* Navbar button ABOVE title */}

                    <button
                        className="navbar-button"
                        onClick={toggleReaderNav}
                    >
                        ☰
                    </button>

                </div>


                {/* Main reading section */}

                <div className="reading-section">

                    {/* Left section */}

                    <div className="chapter-section">

                        {/* Progress */}

                        <div className="reading-progress">

                            <p className="progress-label">
                                Progress
                            </p>

                            <div className="progress-track">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${currentProgress}%`
                                    }}
                                ></div>
                            </div>

                            <p className="progress-percentage">
                                {currentProgress}%
                            </p>

                        </div>


                        {/* Chapter list */}

                        <p className="chapter-list-title">
                            Chapter List
                        </p>

                        <div className="chapter-list">

                            {visibleChapters.map(
                                (chapter) => (
                                    <p
                                        key={chapter}
                                        onClick={() =>
                                            changeChapter(
                                                chapter
                                            )
                                        }
                                        className={
                                            currChapter ===
                                                chapter
                                                ? "active-chapter"
                                                : ""
                                        }
                                    >
                                        Chapter {chapter}
                                    </p>
                                )
                            )}

                            {chapters.length > 10 && (
                                <button
                                    type="button"
                                    className="chapter-list-toggle"
                                    onClick={() =>
                                        setShowAllChapters(!ShowAllChapters)
                                    }
                                >
                                    {ShowAllChapters ? "Show Less" : "Show More"}
                                </button>
                            )}

                        </div>

                    </div>


                    {/* Current chapter */}

                    <div
                        className={`open-chapter ${readingMode === "page turn"
                                ? "page-turn-mode"
                                : ""
                            }`}
                    >

                        <p className="current-chapter">
                            Chapter {currChapter}
                        </p>

                        {readingMode === "flip" ? (
                            <div className="page-turn-reader">

                                <div className="page-turn-panel">
                                    <p
                                        className="chapter-text page-turn-text"
                                        style={{
                                            fontSize: `${12 +
                                                currFont
                                                }px`
                                        }}
                                    >
                                        {currentPageText}
                                    </p>
                                </div>

                                <div className="page-turn-controls">

                                    <button
                                        type="button"
                                        className="page-turn-arrow"
                                        onClick={
                                            goToPreviousPage
                                        }
                                        disabled={
                                            pageIndex === 0
                                        }
                                    >
                                        ◀
                                    </button>

                                    <span className="page-turn-indicator">
                                        {pageIndex + 1} /{" "}
                                        {chapterPages.length}
                                    </span>

                                    <button
                                        type="button"
                                        className="page-turn-arrow"
                                        onClick={
                                            goToNextPage
                                        }
                                        disabled={
                                            pageIndex >=
                                            chapterPages.length -
                                            1
                                        }
                                    >
                                        ▶
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <p
                                className="chapter-text"
                                style={{
                                    fontSize: `${12 + currFont
                                        }px`
                                }}
                            >
                                {currChapterText}
                            </p>

                        )}

                    </div>

                </div>


                {/* Bottom controls */}

                <div className="reading-controls">

                    <button
                        className="mode-button"
                        onClick={changeMode}
                    >
                        {Mode ? "☾" : "☼"}
                    </button>

                    <div className="font-controls">

                        <button
                            onClick={decreaseFont}
                        >
                            A−
                        </button>

                        <button
                            onClick={increaseFont}
                        >
                            A+
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
};

export default OpenBookPage;