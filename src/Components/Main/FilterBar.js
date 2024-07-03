import React from 'react';

const FilterBar = ({ categories, category, sortBy, handleCategoryChange, handleSortChange }) => (
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
);

export default FilterBar;
