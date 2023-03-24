import axios from 'axios';

const getUsers = async (id) => {
  const url = `https://localhost:8000/user/${id}`;
  const res = await axios.get(url);
  return res.data;
};

export default getUsers;
