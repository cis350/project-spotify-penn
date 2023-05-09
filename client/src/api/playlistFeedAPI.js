import axios from 'axios';

import setHeaders from './setHeaders';

const togglePlaylistLikes = async (item) => {
  setHeaders();
  const res = await axios.post(`http://localhost:8000/playlists/like/${item.id}`);

  return res.data;
};

export default togglePlaylistLikes;
