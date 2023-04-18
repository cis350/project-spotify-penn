import axios from 'axios';

const getPlaylists = async () => {
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
