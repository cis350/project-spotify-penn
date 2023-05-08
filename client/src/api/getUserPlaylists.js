import axios from 'axios';

import setHeaders from './setHeaders';

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

export default getPlaylists;
