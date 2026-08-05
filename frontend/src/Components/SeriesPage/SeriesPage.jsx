import React from "react";
import SeriesDetails from "./../../data/series.js";
import BookDetails from "./../../data/books.js";
import "./SeriesPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const SeriesPage = () => {
    const { SeriesId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const series = SeriesDetails.find(seriesBooks => seriesBooks.seriesId === SeriesId);
    const bookIdsInSeries = series.seriesBooks;
    let bookDetailsInSeries = [];
    for (let i = 0; i < bookIdsInSeries.length; i++) {
        bookDetailsInSeries.push(BookDetails.find(bookdetails => bookdetails.bookId === bookIdsInSeries[i]));
    }
    console.log(bookDetailsInSeries);
    bookDetailsInSeries.sort((a,b)=>(a.seriesBookNumber-b.seriesBookNumber));
    const GoBack = () => {
        navigate(-1);
    }
    const OpenBookPage=(bookId)=>{
        navigate(`/book/${bookId}`
        )
    }
    const OpenAuthorPage=()=>{
        navigate(`/author/${series.authorId}`);
    }
    return (
        <div>SeriesPage
            <div className="series-page">
                <div className="series-container">

                    <button className="back-button" onClick={GoBack}>{"﹤"}</button>

                    <div className="series-left">
                        <img
                            src={bookDetailsInSeries[0].coverImage}
                            alt={series.seriesName}
                            className="series-cover"
                        />
                    </div>

                    <div className="series-right">

                        <h1>{series.seriesName}</h1>

                        <p className="author" onClick={OpenAuthorPage}>
                            {series.author}
                        </p>


                        <div className="series-books">
                            <h3>Books in this Series</h3>

                            {bookDetailsInSeries.map((book) => (
                                <div
                                    key={book.bookId}
                                    className="series-book-card"
                                    onClick={() => {OpenBookPage(book.bookId)}}
                                >
                                    <img src={book.coverImage} alt={book.title} />

                                    <div>
                                        <h4>
                                            #{book.seriesBookNumber} {book.title}
                                        </h4>

                                        <p>{book.totalChapters} Chapters</p>
                                    </div>

                                    <span>→</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SeriesPage