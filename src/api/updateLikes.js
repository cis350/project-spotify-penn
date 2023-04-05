import axios from 'axios';

const updateLikesNewArtist = async (item) => {
  const itemlikes = !item.likes;
  const res = await axios.patch(`http://localhost:8000/newartistplaylists/${item.id}`, { likes: itemlikes });
  return res.data;
};

const updateLikesPlaylist = async (item) => {
  const itemlikes = !item.likes;
  const res = await axios.patch(`http://localhost:8000/newartistplaylists/${item.id}`, { likes: itemlikes });
  return res.data;
};

export { updateLikesNewArtist, updateLikesPlaylist };
