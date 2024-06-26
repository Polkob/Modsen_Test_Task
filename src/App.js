import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Components/Main/Main';
import BookDetail from "./Components/BookDetail/BookDetail";

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

