import axios from 'axios';

const getUsers = async (rank) => {
  const url = `https://localhost:8000/songs/${rank}`;
  const res = await axios.get(url);
  return res.data;
};

export default getUsers;
