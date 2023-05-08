/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import axios from 'axios';

const setHeaders = () => {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('sessionId');
};

const getUserData = async (username) => {
  setHeaders();
  const url = `http://localhost:8000/users/${username}`;
  const res = await axios.get(url);
  const userData = res.data;
  if (!userData) {
    return null;
  }
  return userData;
};

const newUser = async (email, first, last, password) => {
  setHeaders();
  const data = {
    _id: email,
    firstName: first,
    lastName: last,
    password,
    new: true,
    songs: [],
    communities: [],
    playlists: [],
    friends: [],
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = 'http://localhost:8000/users';
  const res = await axios.post(
    url,
    data,
    options,
  );
  return res.data;
};

const getFirstName = async (email) => {
  setHeaders();
  const url = `http://localhost:8000/users/${email}`;
  const res = await axios.get(url);
  const userData = res.data;
  if (Object.keys(userData).length === 0) {
    throw new Error('Invalid username');
  } else {
    return userData.firstName;
  }
};

const getFullName = async (email) => {
  setHeaders();
  const url = `http://localhost:8000/users/${email}`;
  const res = await axios.get(url);
  const userData = res.data;
  if (Object.keys(userData).length === 0) {
    throw new Error('Invalid username');
  } else {
    return `${userData.firstName} ${userData.lastName}`;
  }
};

export {
  getFirstName, getUserData, newUser, getFullName,
};
