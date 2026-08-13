import React, { useState,useEffect } from "react";
import "./AuthorPage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const AuthorPage = () => {
    const { AuthorId } = useParams();
    const navigate=useNavigate();
    const [Author, setAuthor] = useState({
        bio: "",
        name: "",
        profileImage: null,
        books:[]
    })
    useEffect(() => {
        const getAuthor = async () => {
            const response = await axios(`http://localhost:5001/api/author/${AuthorId}`);
            setAuthor({
                bio: response.data.author.bio,
                name: response.data.author.name,
                profileImage: response.data.author.profileImage,
                books:response.data.books
            })
        }
        getAuthor();
    }, [AuthorId])

    return (
        <div>AuthorPage
            <div className="author-page">
            <div className="author-container">
                <button className="back-button" onClick={()=>navigate(-1)}>{"﹤"}</button>
                <div className="author-left">
                    <img className="authorpage-profilepic" src={Author.profileImage} alt={Author.name}/>
                </div>
                <div className="author-right">
                <p className="authorpage-name">{Author.name}</p>
                <p className="authorpage-bio">{Author.bio}</p>
                {/* {
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
                } */}
                {
                    Author.books.length!=0?(
                        <div className="authorpage-standalones">
                            {/* <h4>Standalones:</h4> */}
                            <h4>Books:</h4>
                                {
                                    Author.books.map((b)=>{
                                        return (
                                            <div key={b.bookId} className="authorpage-book" onClick={()=>navigate(`/book/${b.bookId}`)}>
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
        </div>
        </div>
    )
}

export default AuthorPage