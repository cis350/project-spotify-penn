import React from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chat from './components/Chat';
import UserProfile from './components/UserProfiles';
import MainHeader from './components/Header';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/home"
        element={(
          <>
            <MainHeader />
            <Home />
          </>
)}
      />
      <Route path="/register" element={(<Register />)} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={(
          <>
            <MainHeader />
            <Chat />
          </>
)}
      />
      <Route
        path="/profile"
        element={(
          <>
            <MainHeader />
            <UserProfile />
          </>
)}
      />
      <Route
        path="/leaderboard"
        element={(
          <>
            <MainHeader />
            <Leaderboard />
          </>
)}
      />
    </Routes>
  );
}

export default App;
