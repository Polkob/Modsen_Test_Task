import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import './Main.css';
import { BASE_URL, MAX_RESULTS, apiKey } from '../Constants/Api';

const Main = () => {
    const [search, setSearch] = useState('');
    const [bookData, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(false);


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

        setLoading(true);

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
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    // const handleCardClick = (id) => {
    //     navigate(`/two/${book.id}`, { state: { book, bookData, search, sortBy, category, startIndex, totalItems } });
    // };

    useEffect(() => {
        searchBook(true);
    }, [search, sortBy, category]);

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
                    <div className="filter-container">
                        <select className="category" value={category} onChange={handleCategoryChange}>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <select className="sort" value={sortBy} onChange={handleSortChange}>
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="total-books">
                <p>Total Books Found: {totalItems} | Books per page: {bookData.length}</p>
            </div>
            <div className="container">
                <Card book={bookData} />
            </div>
            {loading && <div className="loading-indicator">Loading...</div>}
            {!loading && bookData.length < totalItems && (
                <div className="load-more-container">
                    <button className="load-more" onClick={() => searchBook(false)}>Load More</button>
                </div>
            )}
        </>
    );
};

export default Main;
