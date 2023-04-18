import axios from 'axios';

const getUsers = async (id) => {
  const url = `https://localhost:8000/user/${id}`;
  const res = await axios.get(url);
  const { data } = res;

  if (Object.keys(data).length === 0) {
    throw new Error('empty data');
  }

  return data;
};

export default getUsers;
