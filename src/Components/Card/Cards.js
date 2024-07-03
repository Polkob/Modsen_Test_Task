import React from "react";
import BookCard from './BookCard';

const Card = ({ book }) => {
  return (
    <>
      {book.map((item) => (
        <BookCard key={item.id} book={item} />
      ))}
    </>
  );
};

export default Card;