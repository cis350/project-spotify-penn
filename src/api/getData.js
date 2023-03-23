/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const getPassword = async (username) => {
  const url = `http://localhost:8000/user/${username}`;
  const res = await axios.get(url); // fetch(location);
  return res.data;
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

export { getPassword, newUser };
