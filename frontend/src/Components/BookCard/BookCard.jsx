import React,{useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./BookCard.css";
import books from "./../../data/books.js";
import axios from "axios";
const BookCard = ({BookId, Source}) => {
    const navigate=useNavigate();
    const OpenBookPage=()=>(navigate(`/book/${BookId}`,{state:{from:`/${Source}`}}));
    const currBook=books.find(book=>book.bookId===BookId);
    const [BookDetails,setBookDetails]=useState({
        title:"",
        author:"",
        genre:[],
        coverImage:null,
    });
    useEffect(() => {
      const GetBookDetails=async ()=>{
        try{
            const response=await axios.get(`https://blue-coleman-assumptions-blocks.trycloudflare.com/api/books/${BookId}`);
            // console.log(response.data);
            setBookDetails({
                title:response.data.title,
                author:response.data.authorId.name,
                genre:response.data.genres,
                coverImage:response.data.coverImage
            });
        }catch(err){
            console.log(err.message);
        }
      }
      GetBookDetails();
    }, [])

    useEffect(() => {
            console.log(BookDetails);
        }, [BookDetails])
    
  return (
    <div>
        <div className="BookCard" onClick={OpenBookPage}>
            <div className="bookcard-container">
                <img src={BookDetails.coverImage} placeholder={BookDetails.title} />
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