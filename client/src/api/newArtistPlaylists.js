/* eslint-disable no-console */
import axios from 'axios';

import setHeaders from './setHeaders';

const getNewArtistPlaylists = async () => {
  setHeaders();
  const response = await axios.get('http://localhost:8000/newartistplaylists');
  const { data } = response;

  console.log(data);

  if (!data || data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

const postNewArtistPlaylist = async (
  artistName,
  email,
  spotifyURL,
  playlistName,
  description,
) => {
  const res = await axios.post(
    'http://localhost:8000/newartistplaylists',
    {
      artistName,
      email,
      spotifyURL,
      playlistName,
      description,
      likes: false,
    },
  );
  return res.data;
};

export { getNewArtistPlaylists, postNewArtistPlaylist };
