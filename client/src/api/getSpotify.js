import axios from 'axios';

const getSongs = async (token, options) => {
  let url = 'https://api.spotify.com/v1/me/top/tracks';
  const timeRange = options.timeRange || 'short_term';
  const limit = options.limit || 50;
  const offset = options.offset || 0;
  url = `${url}?time_range=${timeRange}&limit=${limit}&offset=${offset}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const getArtists = async (token, options) => {
  let url = 'https://api.spotify.com/v1/me/top/artists';
  const timeRange = options.timeRange || 'short_term';
  const limit = options.limit || 50;
  const offset = options.offset || 0;
  url = `${url}?time_range=${timeRange}&limit=${limit}&offset=${offset}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const setSongs = async (username, newSongs) => {
  try {
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
  } catch (err) {
    const errmsg = err.message;
    console.log(err);
    return errmsg;
  }
};

const setArtists = async (username, newArtists) => {
  try {
    const data = {
      artists: newArtists,
    };
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = `http://localhost:8000/artists/${username}`;
    const res = await axios.put(
      url,
      data,
      options,
    );
    return res.data;
  } catch (err) {
    const errmsg = err.message;
    console.log(err);
    return errmsg;
  }
};

export {
  getSongs, setSongs, getArtists, setArtists,
};
