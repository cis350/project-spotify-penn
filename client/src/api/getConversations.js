import axios from 'axios';

const getConversations = () => new Promise((resolve, reject) => {
  const url = 'http://localhost:8000/conversations';
  axios.get(url)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getConversations;
