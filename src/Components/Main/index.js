import React, { useState, useEffect } from 'react';
import Card from '../Card/Cards';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import './Main.css';
import { MAX_RESULTS } from '../../Constants/Api';
import { searchBook } from './SearchBook';
import { useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../Constants/Сategories';

const Main = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [search, setSearch] = useState(queryParams.get('search') || '');
    const [bookData, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [sortBy, setSortBy] = useState(queryParams.get('sortBy') || 'relevance');
    const [category, setCategory] = useState(queryParams.get('category') || 'all');
    const [loading, setLoading] = useState(false);
    

    const filterDuplicates = (items) => {
        const uniqueItems = [];
        const itemIds = new Set();

        items.forEach(item => {
            if (!itemIds.has(item.id)) {
                uniqueItems.push(item);
                itemIds.add(item.id);
            }
        });

        return uniqueItems;
    };

    const fetchBooks = async (reset = true) => {
        if (reset) {
            setStartIndex(0);
            setData([]);
        }

        setLoading(true);

        try {
            const data = await searchBook(search, category, sortBy, startIndex, reset);

            if (data.items) {
                const uniqueItems = filterDuplicates(data.items);
                setData(prevData => reset ? uniqueItems : filterDuplicates([...prevData, ...uniqueItems]));
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
    }, [sortBy, category]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (sortBy) params.append('sortBy', sortBy);
        if (category) params.append('category', category);
        navigate({ search: params.toString() });
    }, [search, sortBy, category, navigate]);

    const handleSearch = () => {
        fetchBooks(true);
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
                        categories={CATEGORIES}
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
