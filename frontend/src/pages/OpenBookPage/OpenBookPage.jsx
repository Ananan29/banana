import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OpenBookPage.css";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FONTS = {
    sans: "Outfit, sans-serif",
    serif: "Literata, Georgia, serif",
    clean: "system-ui, Segoe UI, sans-serif",
};

const THEMES = [
    { id: "light", label: "Light" },
    { id: "yellow", label: "Yellow" },
    { id: "dark", label: "Dark" },
];

const loadPrefs = () => {
    try {
        return JSON.parse(localStorage.getItem("readerPrefs")) || {};
    } catch {
        return {};
    }
};

const OpenBookPage = ({ onShowNavBar }) => {
    const { BookId } = useParams();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
    const navigate = useNavigate();
    const optionsRef = useRef(null);
    const pageRef = useRef(null);
    const viewportRef = useRef(null);
    const sentinelRef = useRef(null);
    const pendingSpread = useRef("start");
    const prefs = loadPrefs();

    const [currChapter, setcurrChapter] = useState(1);
    const [currChapterText, setcurrChapterText] = useState("");
    const [currChapterTitle, setcurrChapterTitle] = useState("");
    const [loadingChapter, setLoadingChapter] = useState(true);
    const [totalChapters, setTotalChapters] = useState(1);
    const [toc, setToc] = useState([]);
    const [BookDetails, setBookDetails] = useState({ title: "", author: "" });
    const [ShowOptions, setShowOptions] = useState(false);
    const [showToc, setShowToc] = useState(false);
    const [showQA, setShowQA] = useState(false);
    const [theme, setTheme] = useState(prefs.theme || "light");
    const [brightness, setBrightness] = useState(prefs.brightness || 100);
    const [fontKey, setFontKey] = useState(prefs.fontKey || "sans");
    const [fontSize, setFontSize] = useState(prefs.fontSize || 18);
    const [layout, setLayout] = useState(prefs.layout || "spread");
    const [pagesPerSpread, setPagesPerSpread] = useState(2);
    const [pageStep, setPageStep] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [spreadIndex, setSpreadIndex] = useState(0);
    const [spreadCount, setSpreadCount] = useState(1);
    const [qaQuestion, setQaQuestion] = useState("");
    const [qaPassage, setQaPassage] = useState("");
    const [qaAnswer, setQaAnswer] = useState("");
    const [qaMode, setQaMode] = useState("spoiler-free");
    const [qaLoading, setQaLoading] = useState(false);
    const [qaError, setQaError] = useState("");
    const [askChip, setAskChip] = useState(null);

    const GoBack = () => navigate(-1);

    const savePrefs = (next) => {
        localStorage.setItem("readerPrefs", JSON.stringify(next));
    };

    const updatePref = (key, value) => {
        const next = { theme, brightness, fontKey, fontSize, layout, [key]: value };
        if (key === "theme") setTheme(value);
        if (key === "brightness") setBrightness(value);
        if (key === "fontKey") setFontKey(value);
        if (key === "fontSize") setFontSize(value);
        if (key === "layout") {
            setLayout(value);
            pendingSpread.current = "start";
            setSpreadIndex(0);
        }
        savePrefs(next);
    };

    const applyChapter = (data, fallbackTotal, openAt = pendingSpread.current) => {
        setcurrChapter(data.order || 1);
        setcurrChapterText(data.content || "");
        setcurrChapterTitle(data.title || "");
        const total = data.totalOrder || fallbackTotal || totalChapters || 1;
        setTotalChapters(total);
        const position = openAt === "end" ? "end" : "start";
        pendingSpread.current = position;
        setSpreadIndex(position === "end" ? 9999 : 0);
    };

    const changeChapter = async (chapter, openAt = "start") => {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        pendingSpread.current = openAt === "end" ? "end" : "start";
        setLoadingChapter(true);
        setShowToc(false);
        setAskChip(null);
        try {
            const response = await axios.get(`${API_URL}/library/readBook`, {
                params: { bookId: BookId, order: chapter },
                headers: { Authorization: `Bearer ${token}` },
            });
            applyChapter(response.data, toc.length, pendingSpread.current);
        } catch (err) {
            console.log(err.response?.data || err.message);
        } finally {
            setLoadingChapter(false);
        }
    };

    const measurePages = (attempt = 0) => {
        const pass = typeof attempt === "number" ? attempt : 0;
        const flow = pageRef.current;
        const viewport = viewportRef.current;
        const sentinel = sentinelRef.current;
        if (layout !== "spread" || !flow || !viewport || loadingChapter) return;

        const wide = window.innerWidth >= 720;
        const pages = wide ? 2 : 1;
        const pageW = wide
            ? Math.min(430, Math.floor((window.innerWidth - 128) / 2))
            : Math.min(520, window.innerWidth - 72);
        const pageH = Math.min(800, Math.max(360, window.innerHeight - 128));

        viewport.style.width = `${pageW * pages}px`;
        viewport.style.height = `${pageH}px`;
        flow.style.height = `${pageH}px`;
        flow.style.columnWidth = `${pageW}px`;
        flow.style.columnGap = "0px";
        void flow.offsetWidth;

        const step = pageW;
        const cols = Math.max(
            1,
            sentinel && step
                ? Math.round(sentinel.offsetLeft / step) + 1
                : 1
        );

        const spreads = Math.max(1, Math.ceil(cols / pages));
        const target = pendingSpread.current;
        setPagesPerSpread(pages);
        setPageStep(step);
        setPageCount(cols);
        setSpreadCount(spreads);
        setSpreadIndex((current) => {
            if (target === "end") {
                if (spreads <= 1 && pass < 6) return current;
                return Math.max(0, spreads - 1);
            }
            if (target === "start") return 0;
            return Math.min(current, Math.max(0, spreads - 1));
        });

        const needsRetry =
            Boolean(target) &&
            pass < 8 &&
            (pass < 2 || (target === "end" && spreads <= 1));
        if (needsRetry) {
            requestAnimationFrame(() => measurePages(pass + 1));
            return;
        }
        pendingSpread.current = null;
    };

    const atStart = layout === "scroll"
        ? currChapter <= 1
        : currChapter <= 1 && spreadIndex <= 0;
    const atEnd = layout === "scroll"
        ? currChapter >= totalChapters
        : currChapter >= totalChapters && spreadIndex >= spreadCount - 1;

    const goNext = () => {
        if (layout === "scroll") {
            if (currChapter < totalChapters) changeChapter(currChapter + 1, "start");
            return;
        }
        if (spreadIndex < spreadCount - 1) {
            setSpreadIndex(spreadIndex + 1);
            return;
        }
        if (currChapter < totalChapters) {
            changeChapter(currChapter + 1, "start");
        }
    };

    const goPrev = () => {
        if (layout === "scroll") {
            if (currChapter > 1) changeChapter(currChapter - 1, "end");
            return;
        }
        if (spreadIndex > 0) {
            setSpreadIndex(spreadIndex - 1);
            return;
        }
        if (currChapter > 1) {
            changeChapter(currChapter - 1, "end");
        }
    };

    const submitQuestion = async (e) => {
        e?.preventDefault?.();
        const token = localStorage.getItem("authToken");
        if (!token) {
            setQaError("Log in to ask questions about this book.");
            return;
        }
        if (!qaQuestion.trim()) {
            setQaError("Type a question first.");
            return;
        }
        setQaLoading(true);
        setQaError("");
        setQaAnswer("");
        try {
            const response = await axios.post(
                `${API_URL}/qa`,
                {
                    bookId: BookId,
                    question: qaQuestion.trim(),
                    mode: qaMode,
                    order: currChapter,
                    passage: qaPassage || qaQuestion.match(/["“”]([\s\S]{8,})["“”]/)?.[1]?.trim() || "",
                },
                { headers: { Authorization: `Bearer ${token}` }, timeout: 120000 }
            );
            setQaAnswer(response.data.answer || "");
        } catch (err) {
            setQaError(err.response?.data?.message || "Could not get an answer.");
        } finally {
            setQaLoading(false);
        }
    };

    const openAskFromSelection = () => {
        if (!askChip?.text) return;
        setQaQuestion(`What does this mean: "${askChip.text}"`);
        setQaPassage(askChip.text);
        setQaAnswer("");
        setQaError("");
        setShowQA(true);
        setShowOptions(false);
        setShowToc(false);
        setAskChip(null);
        window.getSelection()?.removeAllRanges();
    };

    const handleTextSelect = () => {
        const sel = window.getSelection();
        const text = sel?.toString().trim();
        if (!text || text.length < 2 || !pageRef.current?.contains(sel.anchorNode)) {
            setAskChip(null);
            return;
        }
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        setAskChip({
            text,
            x: Math.min(window.innerWidth - 80, Math.max(80, rect.left + rect.width / 2)),
            y: Math.max(56, rect.top - 10),
        });
    };

    const chapterParagraphs = (currChapterText || "")
        .split(/\n{2,}|\n/)
        .map((para) => para.trim())
        .filter(Boolean);

    const currentTitle =
        currChapterTitle ||
        toc.find((item) => item.order === currChapter)?.title ||
        "";
    const chapterProgress = layout === "spread" && spreadCount
        ? (spreadIndex + 1) / spreadCount
        : 1;
    const progress = totalChapters
        ? Math.round(((currChapter - 1 + chapterProgress) / totalChapters) * 100)
        : 0;
    const leftPage = spreadIndex * pagesPerSpread + 1;
    const rightPage = Math.min(leftPage + pagesPerSpread - 1, pageCount);

    const chapterBody = (
        <>
            {currentTitle && <h1 className="page-title">{currentTitle}</h1>}
            {loadingChapter ? (
                <p className="reader-status">Loading</p>
            ) : chapterParagraphs.length > 0 ? (
                chapterParagraphs.map((para, index) => (
                    <p key={index} className="reader-copy">{para}</p>
                ))
            ) : (
                <p className="reader-status">No text in this section.</p>
            )}
        </>
    );

    useEffect(() => {
        const load = async () => {
            try {
                setLoadingChapter(true);
                const token = localStorage.getItem("authToken");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const [bookResponse, tocResponse] = await Promise.all([
                    axios.get(`${API_URL}/book/${BookId}`, { headers }),
                    axios.get(`${API_URL}/library/chapters`, { params: { bookId: BookId }, headers }),
                ]);
                setBookDetails({
                    title: bookResponse.data.title || "",
                    author: bookResponse.data.author || "",
                });
                const chapters = tocResponse.data.chapters || [];
                setToc(chapters);
                setTotalChapters(tocResponse.data.totalOrder || chapters.length || 1);

                let response;
                try {
                    response = await axios.get(`${API_URL}/library/readBook`, {
                        params: { bookId: BookId },
                        headers,
                    });
                } catch (err) {
                    if (err.response?.status !== 404) throw err;
                    response = await axios.get(`${API_URL}/library/readBook`, {
                        params: { bookId: BookId, order: 1 },
                        headers,
                    });
                }
                applyChapter(response.data, chapters.length);
            } catch (err) {
                console.log(err.response?.data || err.message);
            } finally {
                setLoadingChapter(false);
            }
        };
        load();
    }, [BookId, API_URL]);

    useEffect(() => {
        onShowNavBar(false);
        return () => onShowNavBar(true);
    }, [onShowNavBar]);

    useLayoutEffect(() => {
        if (layout === "scroll") {
            const page = pageRef.current;
            if (!page || loadingChapter) return;
            if (pendingSpread.current === "end") {
                page.scrollTop = page.scrollHeight;
            } else if (pendingSpread.current === "start") {
                page.scrollTop = 0;
            }
            pendingSpread.current = null;
            return;
        }
        if (loadingChapter) return;
        measurePages(0);
        const onResize = () => measurePages(0);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [layout, currChapterText, fontSize, fontKey, theme, loadingChapter]);

    useEffect(() => {
        const onKey = (event) => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                goNext();
            }
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                goPrev();
            }
            if (event.key === "Escape") {
                setShowToc(false);
                setShowQA(false);
                setShowOptions(false);
                setAskChip(null);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    useEffect(() => {
        const close = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div className={`open-book-page theme-${theme} layout-${layout}`}>
            <header className="reader-bar">
                <button type="button" className="bar-icon" onClick={GoBack} aria-label="Back">
                    <FaChevronLeft />
                </button>
                <div className="bar-meta">
                    <p>{BookDetails.title}</p>
                    <span>{BookDetails.author}</span>
                </div>
                <div className="bar-actions">
                    <button
                        type="button"
                        onClick={() => {
                            setShowOptions(false);
                            setShowToc(false);
                            setShowQA((v) => !v);
                        }}
                    >
                        Ask
                    </button>
                    <div className="options-wrap" ref={optionsRef}>
                    <button type="button" onClick={() => { setShowQA(false); setShowToc(false); setShowOptions((v) => !v); }}>
                        Options
                    </button>
                    {ShowOptions && (
                        <div className="options-panel">
                            <p className="opt-label">Layout</p>
                            <div className="opt-pills">
                                <button type="button" className={layout === "spread" ? "is-on" : ""} onClick={() => updatePref("layout", "spread")}>2 pages</button>
                                <button type="button" className={layout === "scroll" ? "is-on" : ""} onClick={() => updatePref("layout", "scroll")}>Scroll</button>
                            </div>
                            <p className="opt-label">Page colour</p>
                            <div className="opt-pills">
                                {THEMES.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={theme === item.id ? "is-on" : ""}
                                        onClick={() => updatePref("theme", item.id)}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <p className="opt-label">Brightness</p>
                            <input
                                type="range"
                                min="70"
                                max="130"
                                value={brightness}
                                onChange={(e) => updatePref("brightness", Number(e.target.value))}
                            />
                            <p className="opt-label">Font</p>
                            <div className="opt-pills">
                                <button type="button" className={fontKey === "sans" ? "is-on" : ""} onClick={() => updatePref("fontKey", "sans")}>Sans</button>
                                <button type="button" className={fontKey === "serif" ? "is-on" : ""} onClick={() => updatePref("fontKey", "serif")}>Serif</button>
                                <button type="button" className={fontKey === "clean" ? "is-on" : ""} onClick={() => updatePref("fontKey", "clean")}>Clean</button>
                            </div>
                            <p className="opt-label">Size</p>
                            <div className="opt-size">
                                <button type="button" onClick={() => fontSize > 14 && updatePref("fontSize", fontSize - 1)}>A−</button>
                                <span>{fontSize}</span>
                                <button type="button" onClick={() => fontSize < 28 && updatePref("fontSize", fontSize + 1)}>A+</button>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </header>

            <button
                type="button"
                className="toc-tab"
                onClick={() => { setShowToc(true); setShowOptions(false); setShowQA(false); }}
            >
                Contents
            </button>

            {showToc && (
                <div className="popup-scrim" onClick={() => setShowToc(false)}>
                    <aside className="chapter-popup" onClick={(e) => e.stopPropagation()}>
                        <p className="side-label">Contents</p>
                        <h2>{BookDetails.title}</h2>
                        <div className="chapter-popup-list">
                            {toc.map((chapter) => (
                                <button
                                    type="button"
                                    key={chapter.order}
                                    className={currChapter === chapter.order ? "is-on" : ""}
                                    onClick={() => changeChapter(chapter.order)}
                                >
                                    {chapter.title}
                                </button>
                            ))}
                        </div>
                    </aside>
                </div>
            )}

            {showQA && (
                <form className="qa-panel" onSubmit={submitQuestion}>
                    <div className="qa-head">
                        <p>Ask AI</p>
                    </div>
                    <div className="qa-modes">
                        <button
                            type="button"
                            className={qaMode === "spoiler-free" ? "is-on" : ""}
                            onClick={() => setQaMode("spoiler-free")}
                        >
                            Spoiler-free
                        </button>
                        <button
                            type="button"
                            className={qaMode === "spoilers" ? "is-on" : ""}
                            onClick={() => setQaMode("spoilers")}
                        >
                            With spoilers
                        </button>
                    </div>
                    <textarea
                        value={qaQuestion}
                        onChange={(e) => {
                            setQaQuestion(e.target.value);
                            if (qaPassage && !e.target.value.includes(qaPassage.slice(0, 24))) {
                                setQaPassage("");
                            }
                        }}
                        placeholder="Ask a question about this book"
                        rows={4}
                    />
                    <div className="qa-actions">
                        <button className="qa-go" type="submit" disabled={qaLoading}>{qaLoading ? "…" : "Ask"}</button>
                        <button type="button" className="qa-close" onClick={() => setShowQA(false)}>Close</button>
                    </div>
                    {qaError && <p className="qa-error">{qaError}</p>}
                    {qaAnswer && <p className="qa-answer">{qaAnswer}</p>}
                </form>
            )}

            {askChip && (
                <button
                    type="button"
                    className="ask-chip"
                    style={{ left: askChip.x, top: askChip.y }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={openAskFromSelection}
                >
                    Ask AI
                </button>
            )}

            <main className="reader-canvas">
                {layout === "scroll" ? (
                    <article
                        ref={pageRef}
                        className="reader-scroll"
                        style={{
                            fontFamily: FONTS[fontKey],
                            fontSize: `${fontSize}px`,
                            "--bright": brightness / 100,
                        }}
                        onMouseUp={handleTextSelect}
                    >
                        {chapterBody}
                    </article>
                ) : (
                    <div
                        ref={viewportRef}
                        className={`reader-viewport pages-${pagesPerSpread}`}
                        style={{ "--bright": brightness / 100 }}
                    >
                        <article
                            ref={pageRef}
                            className="reader-flow"
                            style={{
                                fontFamily: FONTS[fontKey],
                                fontSize: `${fontSize}px`,
                                transform: pageStep
                                    ? `translate3d(${-spreadIndex * pagesPerSpread * pageStep}px, 0, 0)`
                                    : undefined,
                            }}
                            onMouseUp={handleTextSelect}
                        >
                            {chapterBody}
                            <span ref={sentinelRef} className="page-sentinel" aria-hidden="true" />
                        </article>
                    </div>
                )}
            </main>

            <footer className="reader-bar bottom">
                <button type="button" className="bar-icon" onClick={goPrev} disabled={atStart} aria-label="Previous">
                    <FaChevronLeft />
                </button>
                <div className="bar-progress">
                    <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span>
                        {progress}% · {layout === "spread"
                            ? (pagesPerSpread === 2 && rightPage > leftPage ? `${leftPage}–${rightPage}` : `${leftPage}`)
                            : `${currChapter} / ${totalChapters}`}
                    </span>
                </div>
                <button type="button" className="bar-icon" onClick={goNext} disabled={atEnd} aria-label="Next">
                    <FaChevronRight />
                </button>
            </footer>
        </div>
    );
};

export default OpenBookPage;
