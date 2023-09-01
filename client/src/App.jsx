import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import PromptsView from './views/PromptsView';
import Board from './components/Board/Board';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import Admin from './components/Admin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/game' element={<Board />}></Route>
          <Route exact path='/prompts' element={<PromptsView />}></Route>
          <Route exact path='/profile/:_id' element={<UserProfile />}></Route>
          <Route exact path='/profile/:_id/edit' element={<EditProfile />}></Route>
          <Route exact path='/leaderboard' element={<Leaderboard />}></Route>
          <Route exact path='/admin' element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;