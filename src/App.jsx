import React from 'react';
import {
  Navigate, Route, Router,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chat from './components/Chat';
import UserProfile from './components/UserProfiles';
import MainHeader from './components/Header';
import Leaderboard from './components/Leaderboard';
import UserList from './components/UserList';
import NewUserProfile from './components/NewUserProfile';
import Communities from './components/Community';
import AddNewPlaylist from './components/AddNewArtistPlaylist';
import NewArtistsPage from './components/NewArtistsPage';

function App() {
  return (
    <Router>
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
      <Route
        path="/profile/:userId"
        element={(
          <>
            <MainHeader />
            <NewUserProfile />
          </>
      )}
      />
      <Route
        path="/users"
        element={(
          <>
            <MainHeader />
            <UserList />
          </>
      )}
      />
      <Route
        path="/communities"
        element={(
          <>
            <MainHeader />
            <Communities />
          </>
      )}
      />
      <Route
        path="/uploadnewartist"
        element={(
          <>
            <MainHeader />
            <AddNewPlaylist />
          </>
        )}
      />
      <Route
        path="/newartists"
        element={(
          <>
            <MainHeader />
            <NewArtistsPage />
          </>
        )}
      />
    </Router>
  );
}

export default App;
