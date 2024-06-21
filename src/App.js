import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import BookDetail from "./Components/BookDetail";
import './Components/style.css';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="two/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

