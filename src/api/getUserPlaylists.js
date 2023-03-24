import axios from 'axios';

const getPlaylists = async () => {
  const url = 'https://localhost:8000/playlists';
  const res = await axios.get(url);
  return res.data;
};

export default getPlaylists;
