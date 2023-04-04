/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const getOtherUsers = async () => {
  const url = 'http://localhost:8000/other-users';
  const res = await axios.get(url);
  return res.data;
};

export default getOtherUsers;
