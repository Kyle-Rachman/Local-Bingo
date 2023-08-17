import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PromptsView from './views/PromptsView';
import Board from './components/Board/Board';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/game' element={<Board />}></Route>
          <Route exact path='/prompts' element={<PromptsView />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;