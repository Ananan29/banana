import React, { useState, useEffect } from "react";
import SeriesDetails from "./../../data/series.js";
import BookDetails from "./../../data/books.js";
import "./SeriesPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const SeriesPage = () => {
    const { SeriesId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [Series, setSeries] = useState({
        name:"",
        coverImage:null,
        author:"",
        books:null,
        seriesBookNumber:0
    })
    useEffect(() => {
        const getSeries = async () => {
            const response = await axios(`http://localhost:5001/api/series/${SeriesId}`);
            setSeries({
                name: response.data[0]?.series||"",
                coverImage:response.data[0]?.coverImage||null,
                author:response.data[0]?.author||"",
                books: response.data,
                seriesBookNumber:4
            })
            console.log(response.data);
        }
        getSeries();
    }, [])
    useEffect(()=>{console.log(Series)},[Series])


    // Series.books.sort((a,b)=>(a.seriesBookNumber-b.seriesBookNumber));
    const GoBack = () => {
        navigate(-1);
    }
    const OpenBookPage = (bookId) => {
        navigate(`/book/${bookId}`
        )
    }
    const OpenAuthorPage=()=>{
        // navigate(`/author/${Series.authorId}`);
    }
    return (
        <div>SeriesPage
            <div className="series-page">
                <div className="series-container">

                    <button className="back-button" onClick={GoBack}>{"﹤"}</button>

                    <div className="series-left">
                        <img
                            src={Series.coverImage}
                            alt={Series.name}
                            className="series-cover"
                        />
                    </div>

                    <div className="series-right">

                        <h1>{Series.name}</h1>

                        <p className="author" onClick={OpenAuthorPage}>
                            {Series.author}
                        </p>


                        <div className="series-books">
                            <h3>Books in this Series</h3>

                            {Series.books?.map((book) => (
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

                                        {/* <p>{book.totalChapters} Chapters</p> */}
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