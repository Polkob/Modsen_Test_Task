import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookCard.css'; 


const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  const defaultThumbnail = require('../../Assets/images/empty_book.webp');
  const { volumeInfo } = book;
  const thumbnail = volumeInfo?.imageLinks?.smallThumbnail || defaultThumbnail;
  const title = volumeInfo?.title || '';
  const categories = volumeInfo?.categories?.join(', ');
  const authors = volumeInfo?.authors?.join(', ') || '';



  return (
    <div className="book-card" onClick={handleClick}>
      {thumbnail && <img src={thumbnail} alt={title} />}
      <div className="card-content">
        <h5 className="categories">{categories}</h5>
        <h3 className="title">{title}</h3>
        <h4 className="authors">{authors}</h4>
      </div>
    </div>
  );
};

export default BookCard;