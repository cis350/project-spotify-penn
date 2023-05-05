import axios from 'axios';

/**
 * Adds the JWT to the header of an HTTP request
 */
const setHeaders = () => {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('sessionId');
};

const getNewArtistPlaylists = async () => {
  setHeaders();
  const response = await axios.get('http://localhost:8000/newartistplaylists');
  const { data } = response;

  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

const postNewArtistPlaylist = async (
  id,
  artistName,
  email,
  spotifyURL,
  playlistName,
  description,
) => {
  setHeaders();
  const res = await axios.post(
    'http://localhost:8000/newartistplaylists',
    {
      id,
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

const toggleNewArtistLikes = async (item) => {
  setHeaders();
  const itemlikes = !item.likes;
  // eslint-disable-next-line no-underscore-dangle
  const res = await axios.patch(`http://localhost:8000/newartistplaylists/${item._id}`, { likes: itemlikes });
  return res.data;
};

export { getNewArtistPlaylists, postNewArtistPlaylist, toggleNewArtistLikes };
