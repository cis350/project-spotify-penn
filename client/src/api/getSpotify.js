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
    return errmsg;
  }
};

const getUserData = async (token) => {
  const url = 'https://api.spotify.com/v1/me';
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = res.data;
  if (!userData) {
    return null;
  }
  return userData;
};

const newPlaylist = async (token, id, name, desc) => {
  const url = `https://api.spotify.com/v1/users/${id}/playlists`;
  const data = {
    name,
    description: desc,
    public: false,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const res = await axios.post(
    url,
    data,
    options,
  );
  return res.data;
};

const getUserId = async (token) => {
  const url = 'https://api.spotify.com/v1/me';
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = res.data;
  if (!userData) {
    return null;
  }
  return userData.id;
};

const addSongs = async (token, playlistId, songUris) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const data = {
    uris: songUris,
  };
  console.log(data);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const res = await axios.post(
    url,
    data,
    options,
  );
  return res.data;
};

const addCoverImage = async (token, playlistId, image) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/images`;
  const data = image;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'image/jpeg',
    },
  };
  const res = await axios.put(
    url,
    data,
    options,
  );
  return res.data;
};

export {
  getSongs,
  setSongs,
  getArtists,
  setArtists,
  getUserData,
  newPlaylist,
  getUserId,
  addSongs,
  addCoverImage,
};
