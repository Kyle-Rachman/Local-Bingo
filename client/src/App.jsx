import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<h1>Hello world!</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;