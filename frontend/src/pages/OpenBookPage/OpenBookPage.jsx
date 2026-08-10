import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import ownedbooks from "./../../data/ownedbooks.js";
import "./OpenBookPage.css";

const OpenBookPage = ({ onShowNavBar, ShowNavBar }) => {
    const {BookId}=useParams();
    const openbook=ownedbooks.find(book=>book.bookId===BookId);

    const [currChapter, setcurrChapter] = useState(openbook.chapters[0]);
    const [currFont,setcurrFont]=useState(5);
    const [currChapterText, setcurrChapterText] = useState(openbook.chapterTexts[currChapter]);
    const [ShowOptions, setShowOptions] = useState(false);
    const [Mode, setMode] = useState(0);
    const [PageChangeMode, setPageChangeMode] = useState(0);

    const [ReadingProgress, setReadingProgress] = useState(
        JSON.parse(localStorage.getItem("readingProgress")) || {}
    );

    const navigate=useNavigate();

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

    const increaseFont=()=>{
        if(currFont==10)return;
        setcurrFont(currFont+1);
    }

    const decreaseFont=()=>{
        if(currFont==0)return;
        setcurrFont(currFont-1);
    }

    useEffect(() => {
        setcurrChapterText(
            openbook.chapterTexts[currChapter]
        );
    }, [currChapter])

    useEffect(() => {
        const progress =
            JSON.parse(localStorage.getItem("readingProgress")) || {};

        setReadingProgress(progress);
    }, []);

    useEffect(() => {
        onShowNavBar(false);
    }, []);

    const currentProgress = ReadingProgress[BookId] || 0;

    return (
        <div className="open-book-page">

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

                    <button
                        className="options-button"
                        onClick={openOptions}
                    >
                        ⋮
                    </button>

                </div>


                {/* Navbar button ABOVE title */}

                <button
                    className="navbar-button"
                    onClick={() => onShowNavBar(!ShowNavBar)}
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

                <div className="open-chapter">

                    <p className="current-chapter">
                        {currChapter}
                    </p>

                    <p
                        className="chapter-text"
                        style={{
                            fontSize: `${12 + currFont}px`
                        }}
                    >
                        {currChapterText}
                    </p>

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
    )
}

export default OpenBookPage;