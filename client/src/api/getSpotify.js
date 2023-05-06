import axios from 'axios';

const setSongs = async (username, token, newSongs) => {
//   const spotifyOptions = {
//     time_range: 'short_term',
//     limit: 50,
//     offset: 0,
//   };

  const data = {
    songs: newSongs,
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `http://localhost:8000/songs/${username}`;
  const res = await axios.put(
    url,
    data,
    options,
  );
  return res.data;
};

const returnOne = () => 1;

export { setSongs, returnOne };
