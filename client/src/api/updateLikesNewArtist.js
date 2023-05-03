/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const updateLikes = async (item) => {
  const itemlikes = !item.likes;
  const res = await axios.patch(`http://localhost:8000/newartistplaylists/${item._id}`, { likes: itemlikes });
  return res.data;
};

export default updateLikes;
