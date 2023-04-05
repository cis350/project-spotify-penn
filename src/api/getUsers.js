/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const getOtherUsers = async () => {
  const url = 'http://localhost:8000/other-users';
  const res = await axios.get(url);
  return res.data;
};

const getOtherUsersID = async (userId) => {
  const res = await axios.get(`http://localhost:8000/other-users/${userId}`);
  return res.data;
};
export { getOtherUsers, getOtherUsersID };
