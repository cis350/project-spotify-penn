
import axios from 'axios';

import setHeaders from './setHeaders';

const getOtherUsers = async () => {
  setHeaders();
  const url = 'http://localhost:8000/other-users';
  const res = await axios.get(url);
  return res.data;
};

const getOtherUsersID = async (userId) => {
  const res = await axios.get(`http://localhost:8000/other-users/${userId}`);
  return res.data;
};

const followUser = async (userId) => {
  setHeaders();
  const res = await axios.post(`http://localhost:8000/other-users/follow/${userId}`);
  return res.data;
};

export { getOtherUsers, getOtherUsersID, followUser };
