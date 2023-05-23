import React, { useState } from 'react';
import {
  Title, Center, Button, Stack, TextInput, Image, Text, Select, Group,
} from '@mantine/core';
import {
  getSongs, newPlaylist, getUserId, addSongs, addCoverImage,
} from '../api/getSpotify';

function GeneratePlaylist() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [numSongs, setNumSongs] = useState(20);
  const [duration, setDuration] = useState('short_term');
  // get the current month as a lowercase word
  const month = new Date().toLocaleString('default', { month: 'long' }).toLocaleLowerCase();
  // get the current year
  const year = new Date().getFullYear();
  // get the current day
  const day = new Date().getDate();

  const [playlistName, setPlaylistName] = useState(`${month} ${day}`);
  const [playlistDesc, setPlaylistDesc] = useState(`top 20 songs from the 4 weeks before ${month} ${day}, ${year}`);

  const token = window.sessionStorage.getItem('accessToken');

  const spotifyOptions = {
    time_range: duration,
    limit: 20,
    offset: 0,
  };

  console.log(window.sessionStorage.getItem('accessToken'));
  console.log(window.sessionStorage.getItem('sessionId'));

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const raw = reader.result;
      const parts = raw.split('base64,');
      const extractedString = parts[1];

      console.log(extractedString);
      setSelectedImage(raw);
      setImageData(extractedString);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // playlist title which is just the month and day
  const title = playlistName || `${month} ${day}`;
  // playlist description which is the top 20 songs of the past 4 weeks
  let desc = '';
  if (duration === 'short_term') {
    desc = playlistDesc || `top 20 songs from the 4 weeks before ${month} ${day}, ${year}`;
  } else if (duration === 'medium_term') {
    desc = playlistDesc || `top 20 songs from the 6 months before ${month} ${day}, ${year}`;
  }

  const makeNewPlaylist = () => {
  // get the top 20 songs of the past 4 weeks
    getUserId(token).then((userId) => {
    // response is the user's spotify id
      console.log(userId);
      const id = userId;
      getSongs(token, spotifyOptions).then((songs) => {
      // response is the songs array
      // create a new JSON array with just the Song URIs
        const songUris = songs.items.map((item) => item.uri);
        console.log(songUris);
        newPlaylist(token, id, title, desc).then((playlistData) => {
        // response is the playlist data
          console.log(playlistData.id);

          addSongs(token, playlistData.id, songUris).then((data) => {
            console.log(data);
            addCoverImage(token, playlistData.id, imageData).then((res) => {
              console.log(res);
            });
          });
        });
      });
    });
  };

  return (
    <Center height="50vh">
      <Stack spacing="xl">
        <Title align="center" order={1}>Generate Playlist</Title>
        <Group>
          <Text>generate a playlist of your top:</Text>
          <Select
            placeholder="20"
            defaultValue={{ value: 20, label: '20' }}
            data={[
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 50, label: '50' },
            ]}
            onChange={setNumSongs}
            value={numSongs}
          />

          <Text> songs from the last:</Text>
          <Select
            placeholder="4 weeks"
            defaultValue={{ value: 'short_term', label: '4 Weeks' }}
            data={[
              { value: 'short_term', label: '4 Weeks' },
              { value: 'medium_term', label: '6 Months' },
            ]}
            onChange={setDuration}
            value={duration}
          />
        </Group>
        <TextInput label="Custom playlist name" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
        <TextInput label="Custom playlist description" value={playlistDesc} onChange={(e) => setPlaylistDesc(e.target.value)} />
        <div>
          {selectedImage && (
          <Image src={selectedImage} alt="Preview" width={200} height={200} />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <Button onClick={makeNewPlaylist}>Generate Playlist</Button>
      </Stack>
    </Center>
  );
}

export default GeneratePlaylist;
