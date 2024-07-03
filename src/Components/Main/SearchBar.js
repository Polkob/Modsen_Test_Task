import React from 'react';

const handleKeyPress = (evt, onSearch) => {
    if (evt.key === 'Enter') {
        onSearch();
    }
};

const SearchBar = ({ search, setSearch, onSearch }) => (
    <div className="search">
        <input
            type="text"
            placeholder="Enter book name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(evt) => handleKeyPress(evt, onSearch)}
        />
        <button onClick={onSearch}>Search</button>
    </div>
);

export default SearchBar;