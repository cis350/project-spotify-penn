import axios from 'axios';

const getUserCommunities = async () => {
  const url = 'http://localhost:8000/joinedcommunities';
  const res = await axios.get(url);
  return res.data;
};

const postNewUserCommunity = async (
  name,
) => {
  const res = await axios.post(
    'http://localhost:8000/joinedcommunities',
    {
      name,
    },
  );
  return res.data;
};

export { getUserCommunities, postNewUserCommunity };
