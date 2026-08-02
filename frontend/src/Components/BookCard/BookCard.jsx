import React from "react";
import {useNavigate} from "react-router-dom";
import "./BookCard.css";
import books from "./../../data/books.js";
const BookCard = ({BookId, Source}) => {
    const navigate=useNavigate();
    const OpenBookPage=()=>(navigate(`/${Source}/${BookId}`))
    const currBook=books.find(book=>book.bookId===BookId);
    const BookDetails={
        bookName:currBook?.bookName||"",
        author:currBook?.author||"",
        genre:currBook?.genre||"",
        pic:currBook?.pic||"",
    }
  return (
    <div>
        <div className="BookCard" onClick={OpenBookPage}>
            <div className="bookcard-container">
                <img src={BookDetails.pic}/>
                <div className="bookdetails-text">
                    <p className="bookCard-Name">{BookDetails.bookName}</p>
                    <p className="bookCard-Author">{BookDetails.author}</p>
                    <p className="bookCard-Genre">{BookDetails.genre.join(", ")}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookCard