import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import NavBar from './components/NavBar';
import Leaderboard from './components/Leaderboard';

export default function App() {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
