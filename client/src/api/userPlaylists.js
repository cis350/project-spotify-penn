import axios from 'axios';

import setHeaders from './setHeaders';

const getPlaylists = async () => {
  setHeaders();
  const response = await axios.get('http://localhost:8000/playlists');
  const { data } = response;

  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

const postNewPlaylist = async (
  id,
  name,
  desc,
) => {
  setHeaders();
  const res = await axios.post(
    'http://localhost:8000/playlists',
    {
      id,
      name,
      desc,
    },
  );
  return res.data;
};

export { getPlaylists, postNewPlaylist };
