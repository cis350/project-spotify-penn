/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Navigate, Route, Routes, Router,
} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chat from './components/Chat';
import { AuthProvider, useAuth } from './utils/auth';
import UserProfile from './components/User-profiles';
import MainHeader from './components/Header';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated, requireAuth } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" replace />
        )
      )}
      onEnter={requireAuth}
    />
  );
}

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
