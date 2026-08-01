import React from "react";
import {useNavigate} from "react-router-dom";
import "./BookCard.css";
const BookCard = ({BookDetails}) => {
    const navigate=useNavigate();
    const OpenBookPage=()=>(navigate("/BookPage/"+BookDetails.bookId))
  return (
    <div>
        <div className="BookCard" onClick={OpenBookPage}>
            <div className="bookcard-container">
                <img src={BookDetails.pic}/>
                <div className="bookdetails-text">
                    <p className="bookCard-Name">{BookDetails.bookName}</p>
                    <p className="bookCard-Author">{BookDetails.author}</p>
                    <p className="bookCard-Genre">{BookDetails.genre}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookCard