import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';

export const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
export const MAX_RESULTS = 30;
const apiKey = process.env.REACT_APP_API_KEY;

const Main = () => {
    const [search, setSearch] = useState('');
    const [bookData, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');
    const [category, setCategory] = useState('all'); // State для выбранной категории

    const categories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];

    const searchBook = (reset = true) => {
        if (reset) {
            setStartIndex(0);
            setData([]);
        }

        let apiUrl = `${BASE_URL}?q=${search}`;

        if (category !== 'all') {
            apiUrl += `+subject:${category}`;
        }

        apiUrl += `&key=${apiKey}&maxResults=${MAX_RESULTS}&startIndex=${reset ? 0 : startIndex}&orderBy=${sortBy}`;

        axios.get(apiUrl)
            .then(res => {
                if (res.data.items) {
                    setData(prevData => reset ? res.data.items : [...prevData, ...res.data.items]);
                    if (reset) {
                        setTotalItems(res.data.totalItems);
                    }
                    setStartIndex(prevIndex => prevIndex + MAX_RESULTS);
                }
            })
            .catch(err => console.log(err));
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <>
            <div className="header">
                <div className="row2">
                    <h2>Search for book</h2>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Enter book name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(evt) => {
                                if (evt.key === 'Enter') {
                                    searchBook();
                                }
                            }}
                        />
                        <button onClick={() => searchBook()}>Search</button>
                    </div>
                    <select value={category} onChange={handleCategoryChange}>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="relevance">Relevance</option>
                        <option value="newest">Newest</option>
                    </select>
                    <img src="../../public/images/background1.png" alt="" />
                </div>
            </div>
            <div className="total-books">
                <p>Total Books Found: {totalItems} | Books per page: {bookData.length}</p>
            </div>
            <div className="container">
                <Card book={bookData} />
            </div>
            {bookData.length < totalItems && (
                <div className="load-more-container">
                    <button className="load-more" onClick={() => searchBook(false)}>Load More</button>
                </div>
            )}
        </>
    );
};

export default Main;
