/* eslint-disable no-underscore-dangle */
import axios from 'axios';

import setHeaders from './setHeaders';

const updateLikes = async (item) => {
  setHeaders();
  const res = await axios.post(`http://localhost:8000/newartistplaylists/${item._id}`);
  return res.data;
};

export default updateLikes;
