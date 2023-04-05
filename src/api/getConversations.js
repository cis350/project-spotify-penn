import axios from 'axios';

const getConversations = async () => {
  const url = 'http://localhost:8000/conversations';
  const res = await axios.get(url);
  return res.data;
};

export default { getConversations };
