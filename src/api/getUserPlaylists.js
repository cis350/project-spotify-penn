import axios from 'axios';

const getPlaylists = async () => {
  const url = 'https://localhost:8000/playlists';
  const res = await axios.get(url);
  const { data } = res;
  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

export default getPlaylists;
