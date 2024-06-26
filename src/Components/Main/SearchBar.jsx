import React from 'react';

const SearchBar = ({ search, setSearch, onSearch, onKeyPress }) => (
    <div className="search">
        <input
            type="text"
            placeholder="Enter book name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(evt) => {
                if (evt.key === 'Enter') {
                    onSearch();
                }
            }}
        />
        <button onClick={onSearch}>Search</button>
    </div>
);

export default SearchBar;
