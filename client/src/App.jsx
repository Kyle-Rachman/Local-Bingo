import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import PromptsView from './views/PromptsView';
import Board from './components/Board/Board';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import Admin from './components/Admin';
import UserContext from './UserContext';
import PersistLogin from './components/PersistLogin';
import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
  },
});


function App() {
  const [currentUser, setCurrentUser] = useState({})
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route element = {<PersistLogin/>}>
                <Route exact path='/game' element={<Board />}></Route>
                <Route exact path='/prompts' element={<PromptsView />}></Route>
                <Route exact path='/profile/:_id' element={<UserProfile />}></Route>
                <Route exact path='/profile/:_id/edit' element={<EditProfile />}></Route>
                <Route exact path='/leaderboard' element={<Leaderboard />}></Route>
                <Route exact path='/admin' element={<Admin />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default App;