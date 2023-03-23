import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline} from '@mui/material'


import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';


export default function App() {
  return (
    <div style={{backgroundColor: 'black'}}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}