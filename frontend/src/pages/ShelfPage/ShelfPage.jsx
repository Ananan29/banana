import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BookCard from "../../Components/BookCard/BookCard.jsx";
import "./ShelfPage.css";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const LIST_TITLES = ["Top-Rated", "Recently-Added", "New-Releases", "Recommended-Books"];
const PAGE = 12;

const pageFrom = (data) => {
    if (Array.isArray(data)) return { books: data, found: null };
    return {
        books: data?.books || [],
        found: Number.isInteger(data?.found) ? data.found : null,
    };
};

const hasNextPage = (offset, page, found) => {
    if (found != null) return offset + page.length < found;
    return page.length >= PAGE;
};

const ShelfPage = () => {
    const navigate = useNavigate();
    const { genre, listId } = useParams();
    const [searchParams] = useSearchParams();
    const query = (searchParams.get("q") || "").trim();

    const [title, setTitle] = useState("");
    const [kicker, setKicker] = useState("Collection");
    const [books, setBooks] = useState([]);
    const [start, setStart] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async (offset = 0, append = false) => {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            try {
                let response;
                let heading = "";
                let label = "Collection";

                if (genre) {
                    heading = genre.replace(/-/g, " ");
                    label = "Genre";
                    response = await axios.get(`${API}/genre/${encodeURIComponent(genre)}`, {
                        params: { limit: PAGE, start: offset },
                        headers,
                    });
                } else if (listId && LIST_TITLES.includes(listId)) {
                    heading = listId.replace(/-/g, " ");
                    label = "Shelf";
                    response = await axios.get(`${API}/book/${encodeURIComponent(listId)}`, {
                        params: { limit: PAGE, start: offset },
                        headers,
                    });
                } else if (query) {
                    heading = query;
                    label = "Search";
                    response = await axios.get(`${API}/search`, {
                        params: { q: query, limit: PAGE, start: offset },
                    });
                } else {
                    setBooks([]);
                    setTitle("");
                    setHasMore(false);
                    return;
                }

                const { books: page, found } = pageFrom(response.data);
                setTitle(heading);
                setKicker(label);
                setStart(offset);
                setHasMore(hasNextPage(offset, page, found));
                setBooks((prev) => (append ? [...prev, ...page] : page));
            } catch (err) {
                if (!append) setBooks([]);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        load(0, false);
    }, [genre, listId, query]);

    const loadMore = async () => {
        const offset = start + PAGE;
        const token = localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        setLoading(true);
        try {
            let response;
            if (genre) {
                response = await axios.get(`${API}/genre/${encodeURIComponent(genre)}`, {
                    params: { limit: PAGE, start: offset },
                    headers,
                });
            } else if (listId) {
                response = await axios.get(`${API}/book/${encodeURIComponent(listId)}`, {
                    params: { limit: PAGE, start: offset },
                    headers,
                });
            } else {
                response = await axios.get(`${API}/search`, {
                    params: { q: query, limit: PAGE, start: offset },
                });
            }
            const { books: page, found } = pageFrom(response.data);
            setStart(offset);
            setHasMore(hasNextPage(offset, page, found));
            setBooks((prev) => [...prev, ...page]);
        } catch (err) {
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shelf-page">
            <div className="shelf-container">
                <button className="back-button" type="button" onClick={() => navigate(-1)}>
                    ﹤
                </button>
                <p className="shelf-kicker">{kicker}</p>
                <h1 className="shelf-title">{title || "Books"}</h1>
                <p className="shelf-sub">
                    {loading && books.length === 0
                        ? "Loading..."
                        : `${books.length}${hasMore ? "+" : ""} book${books.length === 1 ? "" : "s"}`}
                </p>

                {books.length === 0 && !loading ? (
                    <p className="shelf-empty">No books found.</p>
                ) : (
                    <div className="shelf-books">
                        {books.map((book) => (
                            <BookCard
                                key={book.bookId}
                                BookId={book.bookId}
                                Source="shelf"
                                Book={book}
                            />
                        ))}
                    </div>
                )}

                {hasMore && (
                    <button
                        type="button"
                        className="shelf-more"
                        onClick={loadMore}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load more"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShelfPage;
