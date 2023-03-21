/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chat from './components/Chat';
import UserProfile from './components/UserProfiles';
import MainHeader from './components/Header';

function App() {
  return (
    <>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>

    </>
  );
}

export default App;
