import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import PromptsView from './views/PromptsView';
import Board from './components/Board/Board';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/game' element={<Board />}></Route>
          <Route exact path='/prompts' element={<PromptsView />}></Route>
          <Route exact path='/profile/:_id' element={<p>To become a profile page</p>}></Route>
          <Route exact path='/profile/:_id/edit' element={<p>To become a profile editing page</p>}></Route>
          <Route exact path='/leaderboard' element={<p>To become a leaderboard</p>}></Route>
          <Route exact path='/admin' element={<p>To become admin dashboard</p>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;