import React from "react";
import SeriesDetails from "./../../data/series.js";
import BookDetails from "./../../data/books.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const SeriesPage = () => {
    const {SeriesId}=useParams();
    const location=useLocation();
    const navigate=useNavigate();
    const series=SeriesDetails.find(seriesBooks=>seriesBooks.seriesId===SeriesId);
    const bookIdsInSeries=series.seriesBooks;
    let bookDetailsInSeries=[];
    for(let i=0;i<bookIdsInSeries.length;i++){
        bookDetailsInSeries.push(BookDetails.find(bookdetails=>bookdetails.bookId===bookIdsInSeries[i]));
    }
    console.log(bookDetailsInSeries);
    const GoBack=()=>{
        navigate(location.state?.from||"/discover",{state:{from:location.state?.previous}});
    }
  return (
    <div>SeriesPage
        <button onClick={GoBack}>back</button>
        {/* bookcard */}
        {
            bookDetailsInSeries.map((book)=>{
                return <p key={book.bookId}>{book.bookId} {book.bookName}</p>;
            })
        }
    </div>
  )
}

export default SeriesPage