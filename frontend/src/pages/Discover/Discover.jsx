import React from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import BookCard from "../../Components/BookCard/BookCard.jsx";
import "./Discover.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import BooksDetails from "./../../data/books.js";
const Discover = () => {
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
              bookdetails=><BookCard key={bookdetails.bookId} BookId={bookdetails.bookId} Source="discover"/>
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