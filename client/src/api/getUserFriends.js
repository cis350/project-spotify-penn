import axios from 'axios';

const getFriends = async (email) => {
  // eslint-disable-next-line no-console
  console.log(email);
  const response = await axios.get(`http://localhost:8000/users/friends/${email}`);
  const { data } = response;

  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

export default getFriends;
