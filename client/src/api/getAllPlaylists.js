import axios from 'axios';

/**
 * Adds the JWT to the header of an HTTP request
 */
const setHeaders = () => {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('sessionId');
};

const getPlaylists = async () => {
  setHeaders();
  const url = 'http://localhost:8000/playlists';
  const res = await axios.get(url);
  const { data } = res;
  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

const togglePlaylistLikes = async (item) => {
  setHeaders();
  const itemlikes = !item.likes;
  // eslint-disable-next-line no-underscore-dangle
  const res = await axios.patch(`http://localhost:8000/newartistplaylists/${item._id}`, { likes: itemlikes });
  return res.data;
};

export { getPlaylists, togglePlaylistLikes };
