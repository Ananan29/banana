import React from "react";
import {useNavigate} from "react-router-dom";
import "./BookCard.css";
import books from "./../../data/books.js";
const BookCard = ({BookId, Source}) => {
    const navigate=useNavigate();
    const OpenBookPage=()=>(navigate(`/book/${BookId}`,{state:{from:`/${Source}`}}));
    const currBook=books.find(book=>book.bookId===BookId);
    const BookDetails={
        title:currBook?.title||"",
        author:currBook?.author||"",
        genre:currBook?.genre||[],
        coverImage:currBook?.coverImage||null,
    }
  return (
    <div>
        <div className="BookCard" onClick={OpenBookPage}>
            <div className="bookcard-container">
                <img src={BookDetails.coverImage}/>
                <div className="bookdetails-text">
                    <p className="bookCard-Name">{BookDetails.title}</p>
                    <p className="bookCard-Author">{BookDetails.author}</p>
                    <p className="bookCard-Genre">{BookDetails.genre.join(", ")}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookCard