import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';
import { BASE_URL} from '../../Constants/Api';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`${BASE_URL}/${id}`);
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return <p>Loading...</p>;
    }

    const goBack = () => navigate(-1);

    const volumeInfo = book?.volumeInfo;
    const title = volumeInfo?.title || '';
    const categories = volumeInfo?.categories ? volumeInfo.categories.join(', ') : '';
    const authors = volumeInfo?.authors ? volumeInfo.authors.join(', ') : '';
    const description = volumeInfo?.description ? volumeInfo.description.replace(/<[^>]*>/g, '') : '';
    const thumbnail = volumeInfo?.imageLinks?.smallThumbnail || '';

    // const handleBackClick = () => {
    //     navigate('/');
    // };

    return (
        <div className="book-detail">

            <div className="inner-box">
                <div className="image-container">
                    <img src={thumbnail} alt="" />

                </div>
                <div className="info-container">
                    <div className="info">
                        <h5>{categories}</h5>
                        <h1>{title}</h1>
                        <h3>{authors}</h3>
                        <h4>{volumeInfo.publisher + " "}<span>{volumeInfo.publishedDate}</span></h4>
                        <a href={volumeInfo.previewLink}><button>More</button></a>

                    </div>
                    <div className="description">
                        <h4>{description}</h4>

                    </div>
                    <button
                        className="close"
                        onClick={goBack}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;

