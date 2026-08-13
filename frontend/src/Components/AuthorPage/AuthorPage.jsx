import React, { useEffect } from "react";
import AuthorDetails from "./../../data/authors.js";
import SeriesDetails from "./../../data/series.js";
import BookDetails from "./../../data/books.js";
import "./AuthorPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const AuthorPage = () => {
    const {AuthorId}=useParams();
    // const navigate=useNavigate();
    // const author=AuthorDetails.find((author)=>author.authorId===AuthorId);
    // console.log(author);
    // const books=BookDetails.filter((book)=>book.authorId===AuthorId&&book.seriesId===null)||[];
    // const series=SeriesDetails.filter((series)=>series.authorId===AuthorId)||[];
    // console.log(books);
    useEffect(() => {
      const getAuthor=async ()=>{
        const response=await axios(`http://localhost:5001/api/${AuthorId}`);
        console.log(response.data);
      }
      getAuthor();
    }, [])
    
  return (
    <div>AuthorPage
        {/* <div className="author-page">
            <div className="author-container">
                <button className="back-button" onClick={()=>navigate(-1)}>{"﹤"}</button>
                <div className="author-left">
                    <img className="authorpage-profilepic" src={author.profileImage} alt={author.name}/>
                </div>
                <div className="author-right">
                <p className="authorpage-name">{author.name}</p>
                <p className="authorpage-bio">{author.bio}</p>
                {
                    series.length!=0?(
                        <div className="authorpage-series-section">
                            <h4>Series:</h4>
                            {
                                series.map((s)=>{
                                    return (
                                        <div key={s.seriesId} className="authorpage-series">
                                            <p className="authorpage-series-name">{s.seriesName}</p>
                                            <p className="authorpage-series-length">{s.seriesBooks.length}</p>
                                            <img className="authorpage-series-pic" src={BookDetails.find(seriesbook=>seriesbook.bookId===s.seriesBooks[0]).coverImage}/>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ):(<></>)
                }
                {
                    books.length!=0?(
                        <div className="authorpage-standalones">
                            <h4>Standalones:</h4>
                                {
                                    books.map((b)=>{
                                        return (
                                            <div key={b.bookId} className="authorpage-book">
                                                <p className="authorpage-book-name">{b.title}</p>
                                                <p className="authorpage-book-length">{b.totalChapters}</p>
                                                <img className="authorpage-book-pic" src={b.coverImage}/>
                                            </div>
                                        );
                                    })
                                }
                        </div>
                    ):(<></>)
                }
                </div>
            </div>  
        </div> */}
    </div>
  )
}

export default AuthorPage