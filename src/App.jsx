import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserProfile from './components/user-profiles';
import MainHeader from './components/header';

function App() {
  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
}
export default App;
