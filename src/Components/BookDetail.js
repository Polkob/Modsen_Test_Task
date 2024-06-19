import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const book = location.state?.book;

    if (!book) {
        return <p>Loading...</p>;
    }

    const { volumeInfo } = book;
    const thumbnail = volumeInfo.imageLinks && volumeInfo.imageLinks.smallThumbnail;

    return (
        <div className="book-detail">
            <button className="close" onClick={() => navigate('/')}>×</button>
            <div className="inner-box">
                <div className="image-container">
                    <img src={thumbnail} alt="" />
                </div>
                <div className="info-container">
                    <div className="info">
                        <h1>{volumeInfo.title}</h1>
                        <h3>{volumeInfo.authors && volumeInfo.authors.join(', ')}</h3>
                        <h4>{volumeInfo.publisher}<span>{volumeInfo.publishedDate}</span></h4>
                        <a href={volumeInfo.previewLink}><button>More</button></a>
                    </div>
                    <div className="description">
                        <h4>{volumeInfo.description}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
