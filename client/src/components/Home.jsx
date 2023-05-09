
import React, { useEffect, useState } from 'react';
import {
  Title, Center, Button, Stack,
} from '@mantine/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { useNavigate } from 'react-router-dom';
import {
  setSongs, getSongs, setArtists, getArtists,
} from '../api/getSpotify';

function Home() {
  const [auth, setAuth] = useState(false);
  // get access token from session storage
  const navigate = useNavigate();
  const getAccessToken = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('error')) {
      const error = searchParams.get('error');
      console.error(`Authentication failed: ${error}`);
      setAuth(false);
      navigate('/login');
    } else {
      setAuth(true);
      const hash = window.location.href;
      if (!(window.sessionStorage.getItem('accessToken'))) {
        const accessToken = hash.substring(hash.indexOf('=') + 1, hash.indexOf('&'));
        window.sessionStorage.setItem('accessToken', accessToken);
      }
    }
  };
  const accessToken = window.sessionStorage.getItem('accessToken');

  const getSpotifyData = (token) => {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    spotifyApi.getMe().then((data) => {
      window.sessionStorage.setItem('imageURL', data.images[0].url);
    });

    const spotifyOptions = {
      time_range: 'short_term',
      limit: 50,
      offset: 0,
    };

    getArtists(token, spotifyOptions).then((data) => {
      const artistData = data.items.map((item) => {
        const artistName = item.name;
        const { genres } = item;
        const { popularity } = item;
        const artistImage = item.images[0].url;

        return {
          artistName,
          genres,
          popularity,
          artistImage,
        };
      });
      const userId = window.sessionStorage.getItem('sessionId');
      setArtists(userId, artistData);
    });

    getSongs(token, spotifyOptions).then((data) => {
      const songData = data.items.map((item) => {
        const { id } = item;
        const songName = item.name;
        const artistsNames = item.artists.map((artist) => ({
          name: artist.name,
          id: artist.id,
        }));
        const albumName = item.album.name;
        const releaseYear = item.album.release_date.slice(0, 4);
        const albumImage = item.album.images[0].url;

        return {
          id,
          songName,
          artistsNames,
          albumName,
          releaseYear,
          albumImage,
        };
      });
      const userId = window.sessionStorage.getItem('sessionId');
      setSongs(userId, songData);
    });
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <Center mt="33vh">
      {auth ? (
        <Stack align="center" direction="column" spacing="xl">
          <Title
            align="center"
            height="100vh"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontSize: 100,
              fontWeight: 900,
            })}
          >
            Welcome to Spotify@Penn!
          </Title>
          <Button size="xl" onClick={() => getSpotifyData(accessToken)}>
            Get My Spotify Data
          </Button>
        </Stack>
      ) : (
        <Title
          align="center"
          height="100vh"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontSize: 100,
            fontWeight: 900,
          })}
        >
          redirecting
        </Title>
      )}
    </Center>
  );
}

export default Home;
