/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const getPassword = async (username) => {
  const url = `http://localhost:8000/user/${username}`;
  const res = await axios.get(url);
  const userData = res.data;
  if (Object.keys(userData).length === 0) {
    throw new Error('Invalid username');
  } else {
    return userData;
  }
};

const newUser = async (email, first, last, password) => {
  const data = {
    id: email,
    first,
    last,
    password,
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = 'http://localhost:8000/user';
  const res = await axios.post(
    url,
    data,
    options,
  );
  return res.data;
};

const getFirstName = async (email) => {
  const url = `http://localhost:8000/user/${email}`;
  const res = await axios.get(url);
  const userData = res.data;
  if (Object.keys(userData).length === 0) {
    throw new Error('Invalid username');
  } else {
    return userData.firstName;
  }
};

export { getFirstName, getPassword, newUser };
