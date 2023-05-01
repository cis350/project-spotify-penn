/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const getPassword = async (username) => {
  const url = `http://localhost:8000/users/${username}`;
  const res = await axios.get(url);
  const userData = res.data;
  console.log(userData);
  if (Object.keys(userData).length === 0) {
    throw new Error('Invalid username');
  } else {
    return userData;
  }
};

const newUser = async (email, first, last, password) => {
  const data = {
    id: email,
    firstName: first,
    lastName: last,
    password,
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
  const url = `http://localhost:8000/users/${email}`;
  const res = await axios.get(url);
  const userData = res.data;
  if (Object.keys(userData).length === 0) {
    throw new Error('Invalid username');
  } else {
    return userData.firstName;
  }
};

export { getFirstName, getPassword, newUser };
