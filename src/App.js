/* eslint-disable no-unused-vars */ 
import React from 'react';
import Header from './components/header';
import { Route, Routes} from 'react-router-dom';
import ' ./App.css';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <>
      <Header>
      </Header>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
      </ Routes>
    </>
  );
}
export default App;
