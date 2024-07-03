import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Components/Main/index';
import BookDetail from "./Components/BookDetail/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="book/:id" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

