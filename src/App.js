/* eslint-disable no-unused-vars */ 
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './App.css';
import UserProfile from './components/user-profiles.js';
import MainHeader from './components/Header.js';

function App() {
  return (
    <>
      <MainHeader>
      </MainHeader>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
      </ Routes>
    </>
  );
}
export default App;
