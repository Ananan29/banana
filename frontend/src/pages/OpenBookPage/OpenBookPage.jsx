import React, {useState, useEffect, useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ownedbooks from "./../../data/ownedbooks.js";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import "./OpenBookPage.css";

const OpenBookPage = ({ onShowNavBar, ShowNavBar }) => {
    const {BookId}=useParams();
    const openbook=ownedbooks.find(book=>book.bookId===BookId);
    const [readerNavVisible, setReaderNavVisible] = useState(false);

    const [currChapter, setcurrChapter] = useState(openbook.chapters[0]);
    const [currFont,setcurrFont]=useState(5);
    const [currChapterText, setcurrChapterText] = useState(openbook.chapterTexts[currChapter]);
    const [ShowOptions, setShowOptions] = useState(false);
    const [Mode, setMode] = useState(false);
    const [PageChangeMode, setPageChangeMode] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    const [ReadingProgress, setReadingProgress] = useState(
        JSON.parse(localStorage.getItem("readingProgress")) || {}
    );

    const navigate=useNavigate();
    const optionsRef = useRef(null);

    const GoBack=()=>{
        navigate(-1);
    }

    const openOptions=()=>{
        setShowOptions(!ShowOptions);
    }

    const askAI=()=>{}

    const changePageChangeMode=()=>{
        setPageChangeMode(!PageChangeMode);
    }

    const changeChapter=(chapter)=>{
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
    }

    const changeMode=()=>{
        setMode(!Mode);
    }

    const [readingMode, setReadingMode] = useState("scroll");

    const toggleReadingMode = () => {
        setReadingMode((prev) => prev === "scroll" ? "flip" : "scroll");
        setPageIndex(0);
    };

    const chapterPages = currChapterText ? currChapterText.split(/\s+/).reduce((pages, word, index) => {
        const pageIndexForWord = Math.floor(index / 120);

        if (!pages[pageIndexForWord]) {
            pages[pageIndexForWord] = [];
        }

        pages[pageIndexForWord].push(word);

        return pages;
    }, []).map((pageWords) => pageWords.join(" ")) : [""];

    const currentPageText = chapterPages[pageIndex] || "";

    const goToPreviousPage = () => {
        setPageIndex((prev) => Math.max(prev - 1, 0));
    };

    const goToNextPage = () => {
        setPageIndex((prev) => Math.min(prev + 1, chapterPages.length - 1));
    };

    const increaseFont=()=>{
        if(currFont==10)return;
        setcurrFont(currFont+1);
    }

    const decreaseFont=()=>{
        if(currFont==0)return;
        setcurrFont(currFont-1);
    }

    useEffect(() => {
        const nextText = openbook.chapterTexts[currChapter] || "";
        setcurrChapterText(nextText);
        setPageIndex(0);
    }, [currChapter])

    useEffect(() => {
        const progress =
            JSON.parse(localStorage.getItem("readingProgress")) || {};

        setReadingProgress(progress);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        onShowNavBar(false);
        setReaderNavVisible(false);

        return () => {
            onShowNavBar(true);
        };
    }, []);

    const currentProgress = ReadingProgress[BookId] || 0;

    const toggleReaderNav = () => {
        setReaderNavVisible((prev) => !prev);
    };

    return (
        <>
            {readerNavVisible && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 200 }}>
                    <Navbar ShowAuth={() => {}} LoggedIn={true} />
                </div>
            )}

            <div className={`open-book-page ${Mode ? "dark-mode" : ""}`}>

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
                        {openbook.title}
                    </p>
                </div>


                {/* Author */}

                <div className="header-info">
                    <p className="book-author">
                        {openbook.author}
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

                    <div className="reader-options-wrapper" ref={optionsRef}>
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
                                    onClick={toggleReadingMode}
                                >
                                    <span className="reader-option-label">Page change style:</span>
                                    <span>{readingMode}</span>
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

                        {openbook.chapters.map(
                            chapter=>(
                                <p
                                    key={chapter}
                                    onClick={()=>changeChapter(chapter)}
                                    className={
                                        currChapter === chapter
                                            ? "active-chapter"
                                            : ""
                                    }
                                >
                                    {chapter}
                                </p>
                            )
                        )}

                    </div>

                </div>


                {/* Current chapter */}

                <div className={`open-chapter ${readingMode === "page turn" ? "page-turn-mode" : ""}`}>

                    <p className="current-chapter">
                        {currChapter}
                    </p>

                    {readingMode === "flip" ? (
                        <div className="page-turn-reader">
                            <div className="page-turn-panel">
                                <p
                                    className="chapter-text page-turn-text"
                                    style={{
                                        fontSize: `${12 + currFont}px`
                                    }}
                                >
                                    {currentPageText}
                                </p>
                            </div>

                            <div className="page-turn-controls">
                                <button
                                    type="button"
                                    className="page-turn-arrow"
                                    onClick={goToPreviousPage}
                                    disabled={pageIndex === 0}
                                >
                                    ◀
                                </button>

                                <span className="page-turn-indicator">
                                    {pageIndex + 1} / {chapterPages.length}
                                </span>

                                <button
                                    type="button"
                                    className="page-turn-arrow"
                                    onClick={goToNextPage}
                                    disabled={pageIndex >= chapterPages.length - 1}
                                >
                                    ▶
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p
                            className="chapter-text"
                            style={{
                                fontSize: `${12 + currFont}px`
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

                    <button onClick={decreaseFont}>
                        A−
                    </button>

                    <button onClick={increaseFont}>
                        A+
                    </button>

                </div>

            </div>

            </div>
        </>
    )
}

export default OpenBookPage;