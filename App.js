import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import ListProducts from './components/ListProducts';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<ListProducts />} />
          <Route path="addproduct" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
