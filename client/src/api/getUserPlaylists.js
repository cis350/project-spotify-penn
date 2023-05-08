import axios from 'axios';

const getUserPlaylists = async (email) => {
  // eslint-disable-next-line no-console
  console.log(email);
  const response = await axios.get(`http://localhost:8000/users/playlists/${email}`);

  const { data } = response;

  if (data.length === 0) {
    throw new Error('empty data');
  } else {
    return data;
  }
};

const postNewUserPlaylist = async (
  email,
  playlistid,
  name,
  desc,
) => {
  const res = await axios.post(
    `http://localhost:8000/users/playlists/${email}`,
    {
      playlistid,
      name,
      desc,
    },
  );
  return res.data;
};

export { getUserPlaylists, postNewUserPlaylist };
