import axios from 'axios';

const getFriends = () => new Promise((resolve, reject) => {
  const url = 'http://localhost:8000/friends';
  axios.get(url)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getFriends;
