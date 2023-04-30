import React, { useEffect, useState } from 'react';
import { Title, Center, Button } from '@mantine/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { useNavigate } from 'react-router-dom';

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
      const accessToken = hash.substring(hash.indexOf('=') + 1, hash.indexOf('&'));
      console.log(`Access token: ${accessToken}`);
      window.sessionStorage.setItem('accessToken', accessToken);
    }
  };
  const accessToken = window.sessionStorage.getItem('accessToken');

  const getSpotifyData = (token) => {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    spotifyApi.getMe().then((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    getAccessToken();
  }, []);
  return (
    <Center mt="33vh">
      {auth ? (
        <>
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
          <Button onClick={getSpotifyData(accessToken)}>
            Get Spotify Data
          </Button>

        </>
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
