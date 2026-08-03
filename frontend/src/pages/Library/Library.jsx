import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar.jsx"
import books from "../../data/books.js";
import "./Library.css";
const Library = ({LoggedIn}) => {
  const [OwnedBookIds, setOwnedBookIds] = useState(JSON.parse(localStorage.getItem("ownedBooks")))||[];
  // useEffect(()=>{},[])
  return (
    <div>
      Library
      {!LoggedIn?(<p>log in to access features</p>):(
        <div className="owned-books-section">
          {
            OwnedBookIds?.map((ownedbooksid)=>{
              const book=books.find((book)=>book.bookId===(ownedbooksid));
              return (
                <div key={ownedbooksid} className="owned-books-card">
                  <img src={book?.pic} alt={book?.pic}/>
                  <div className="owned-books-details">
                    <p className="owned-books-name">{book?.bookName}</p>
                    <p className="owned-books-author">{book?.author}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      )}
    </div>
  )
}

export default Library