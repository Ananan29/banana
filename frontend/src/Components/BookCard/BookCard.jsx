import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";
import axios from "axios";

const BookCard = ({ BookId, Source, Book }) => {
    const navigate = useNavigate();
    const OpenBookPage = () => (navigate(`/book/${BookId}`, { state: { from: `/${Source}` } }));
    const [BookDetails, setBookDetails] = useState({
        title: Book?.title || "",
        author: Book?.author || "",
        genre: Book?.genres || [],
        coverImage: Book?.coverImage || null,
    });
    useEffect(() => {
        if (Book?.title && Book?.coverImage) {
            setBookDetails({
                title: Book.title,
                author: Book.author || "",
                genre: Book.genres || [],
                coverImage: Book.coverImage,
            });
            return;
        }
        const GetBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/book/${BookId}`);
                setBookDetails({
                    title: response.data.title,
                    author: response.data.author,
                    genre: response.data.genres || [],
                    coverImage: response.data.coverImage
                });
            } catch (err) {
                console.log(err.message);
            }
        }
        GetBookDetails();
    }, [BookId, Book])

    return (
        <div className="BookCard" onClick={OpenBookPage}>
            <div className="bookcard-container">
                {BookDetails.coverImage ? (
                    <img
                        src={BookDetails.coverImage}
                        alt={BookDetails.title}
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="bookcard-fallback">{BookDetails.title || "Book"}</div>
                )}
                <div className="bookdetails-text">
                    <p className="bookCard-Name">{BookDetails.title}</p>
                    <p className="bookCard-Author">{BookDetails.author}</p>
                    {BookDetails.genre?.length > 0 && (
                        <p className="bookCard-Genre">{BookDetails.genre.join(", ")}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default React.memo(BookCard);
