import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import './Main.css';
import { BASE_URL, MAX_RESULTS, apiKey } from '../../Constants/Api';
import { searchBook } from './SearchBook';

const Main = () => {
    const [search, setSearch] = useState('');
    const [bookData, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [sortBy, setSortBy] = useState('relevance');
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(false);


    const categories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];

    const fetchBooks = async (reset = true) => {
        if (reset) {
            setStartIndex(0);
            setData([]);
        }

        setLoading(true);

        try {
            const data = await searchBook(search, category, sortBy, startIndex, reset);

            if (data.items) {
                setData(prevData => reset ? data.items : [...prevData, ...data.items]);
                if (reset) {
                    setTotalItems(data.totalItems);
                }
                setStartIndex(prevIndex => prevIndex + MAX_RESULTS);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        fetchBooks(true);
    }, [search, sortBy, category]);

    const handleSearch = () => {
        fetchBooks();
    };

    const handleLoadMoreClick = () => {
        fetchBooks(false);
    };

    return (
        <>
            <div className="header">
                <div className="row2">
                    <h2>Search for book</h2>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        onSearch={handleSearch}
                        onKeyPress={handleSearch}
                    />
                    <FilterBar
                        categories={categories}
                        category={category}
                        sortBy={sortBy}
                        handleCategoryChange={handleCategoryChange}
                        handleSortChange={handleSortChange}
                    />
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
                    <button className="load-more" onClick={handleLoadMoreClick}>Load More</button>
                </div>
            )}
        </>
    );
};

export default Main;
