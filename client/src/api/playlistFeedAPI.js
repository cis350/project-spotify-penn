import axios from 'axios';

import setHeaders from './setHeaders';

const togglePlaylistLikes = async (item) => {
  setHeaders();
  const res = await axios.post(`http://localhost:8000/playlists/like/${item.id}`);
  // const itemlikes = !item.likes;
  // const res = await axios.patch(`http://localhost:8000/newartistplaylists/${item._id}`, { likes: itemlikes });
  return res.data;
};

export default togglePlaylistLikes;
