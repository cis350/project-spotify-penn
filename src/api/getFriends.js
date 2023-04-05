import axios from 'axios';

const getFriends = async () => {
  const url = 'http://localhost:8000/friends';
  const res = await axios.get(url);
  return res.data;
};

export default { getFriends };
