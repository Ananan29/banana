import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import BookCard from "../../Components/BookCard/BookCard.jsx";
import "./Discover.css";
import bookPic1 from "./../../assets/images.jpeg";
import bookPic2 from "./../../assets/43514655.jpg";
import bookPic3 from "./../../assets/bookPic3.jpg";
import bookPic4 from "./../../assets/bookPic4.jpg";
import bookPic5 from "./../../assets/bookPic5.jpg";
import bookPic6 from "./../../assets/bookPic6.jpg";
import bookPic7 from "./../../assets/bookPic7.jpg";
import bookPic8 from "./../../assets/bookPic8.jpg";
import bookPic9 from "./../../assets/bookPic9.jpg";
import bookPic10 from "./../../assets/bookPic10.jpg";
import bookPic11 from "./../../assets/bookPic11.jpg";
import bookPic13 from "./../../assets/bookPic13.jpg";
import bookPic14 from "./../../assets/bookPic14.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
const Discover = () => {
  const BooksDetails=[
    {
      bookId:11,
      bookName:"Twisted Lies",
      author:"Ana Huang",
      genre:"Romance",
      pic: bookPic1
    },
    {
      bookId:12,
      bookName:"Reveal Me",
      author:"Tareheh Mafi",
      genre:"Fantasy, Dystopia, Romance, Young Adult, Romantasy, Novella, Science Fiction, Fiction, Ebooks, Audiobook",
      pic: bookPic2
    },
    {
    bookId: 13,
    bookName: "Shatter Me",
    author: "Tahereh Mafi",
    genre: "Young Adult, Dystopian, Fantasy, Romance, Science Fiction",
    pic: bookPic3
  },
  {
    bookId: 14,
    bookName: "Powerless",
    author: "Lauren Roberts",
    genre: "Fantasy, Young Adult, Romance, Romantasy, Magic",
    pic: bookPic4
  },
  {
    bookId: 15,
    bookName: "Fourth Wing",
    author: "Rebecca Yarros",
    genre: "Fantasy, Dragons, Romance, New Adult, Romantasy",
    pic: bookPic5
  },
  {
    bookId: 16,
    bookName: "The Love Hypothesis",
    author: "Ali Hazelwood",
    genre: "Romance, Contemporary, Adult, Fiction",
    pic: bookPic6
  },
  {
    bookId: 17,
    bookName: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Historical Fiction, Romance, LGBT, Fiction",
    pic: bookPic7
  },
  {
    bookId: 18,
    bookName: "The Cruel Prince",
    author: "Holly Black",
    genre: "Fantasy, Young Adult, Fae, Romance, Magic",
    pic: bookPic8
  },
  {
    bookId: 19,
    bookName: "Divine Rivals",
    author: "Rebecca Ross",
    genre: "Fantasy, Romance, Historical Fantasy, Young Adult",
    pic: bookPic9
  },
  {
    bookId: 20,
    bookName: "Better Than the Movies",
    author: "Lynn Painter",
    genre: "Young Adult, Romance, Contemporary, Fiction",
    pic: bookPic10
  },
  {
    bookId: 21,
    bookName: "A Good Girl's Guide to Murder",
    author: "Holly Jackson",
    genre: "Mystery, Young Adult, Thriller, Crime",
    pic: bookPic11
  },
  {
    bookId: 23,
    bookName: "It Ends with Us",
    author: "Colleen Hoover",
    genre: "Romance, Contemporary, Fiction, Adult",
    pic: bookPic13
  },
  {
    bookId: 24,
    bookName: "The Song of Achilles",
    author: "Madeline Miller",
    genre: "Historical Fiction, Mythology, LGBT, Fantasy, Romance",
    pic: bookPic14
  }
  ];
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);
  const scroll = (amount) => {
    scrollRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };
  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };
  const updateArrows = () => {
    const el = scrollRef.current;

    setShowLeft(el.scrollLeft > 5);

    setShowRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth - 5
    );
  };

  useEffect(() => {
      updateArrows();

      const el = scrollRef.current;
      el.addEventListener("scroll", updateArrows);
      window.addEventListener("resize", updateArrows);

      return () => {
          el.removeEventListener("scroll", updateArrows);
          window.removeEventListener("resize", updateArrows);
      };
  }, []);
  return (
    <>
      gg
      gg
      <div className="books-section">
        {showLeft && (
          <button
              className={"scroll-btn left"}
              onClick={() => scroll(-600)}
          >
              <FaChevronLeft />
          </button>
        )}
        <div className="books-scroll-cards" ref={scrollRef} onWheel={handleWheel}>
          {
            BooksDetails.map(
              bookdetails=><BookCard key={bookdetails.bookId} BookDetails={bookdetails}/>
            )
          }
        </div>
        {showRight && (
          <button className={"scroll-btn right"} onClick={() => scroll(600)}>
              <FaChevronRight />
          </button>
        )}
      </div>
    </>
  )
}

export default Discover