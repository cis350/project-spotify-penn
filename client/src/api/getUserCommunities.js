import axios from 'axios';

const getUserCommunities = async (email) => {
  const response = await axios.get(`http://localhost:8000/users/communities/${email}`);
  const { data } = response;

  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

export default getUserCommunities;
