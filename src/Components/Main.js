import React, { useState } from 'react';
import Card from './Card';
import axios from 'axios';

const Main = () => {
    const [search, setSearch] = useState('');
    const [bookData, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const searchBook = () => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=30')
            .then(res=>setData(res.data.items))
            .catch(err=>console.log(err))
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
                        <button onClick={searchBook}>o-</button>
                    </div>
                    <img src="../../public/images/background1.png" alt="" />
                </div>
            </div>
            <div className="container">
              {
                    <Card book={bookData}/>
              }  
            </div>
            {/* <button onClick={() => setCurrentPage(currentPage + 1)}>Показать еще</button> */}
        </>
    );
};

export default Main;