import axios from 'axios';
import { getUserData } from './getUserData';

const setHeaders = () => {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('sessionId');
};

const getUserPlaylists = async () => {
  const email = getUserData(setHeaders.sessionId).then((data) => (data.email));
  // eslint-disable-next-line no-console
  console.log(email);
  const response = await axios.get(`http://localhost:8000/users/${email}/playlists`);

  const { data } = response;

  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

const postNewUserPlaylist = async (
  id,
  name,
  desc,
) => {
  const email = getUserData(setHeaders.sessionId).then((data) => (data.email));
  const res = await axios.post(
    `http://localhost:8000/users/${email}/playlists`,
    {
      id,
      name,
      desc,
    },
  );
  return res.data;
};

export { getUserPlaylists, postNewUserPlaylist };
