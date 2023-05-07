import axios from 'axios';

const getPlaylists = async () => {
  const url = 'http://localhost:8000/playlists';
  const res = await axios.get(url);
  const { data } = res;
  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

const postPlaylists = async (
  name,
  desc,
) => {
  const res = await axios.post(
    'http://localhost:8000/playlists',
    {
      name,
      desc,
    },
  );
  return res.data;
};

export { getPlaylists, postPlaylists };
