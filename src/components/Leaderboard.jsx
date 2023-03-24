/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Center, Container, Paper, Stack, Divider, Select, Button, Group, Title,
} from '@mantine/core';
import LazyTable from './LazyTable';

export default function HomePage() {
  const [content, setContent] = useState('Song');
  const songColumns = [
    {
      field: 'rank',
      headerName: 'Rank',
    },
    {
      field: 'title',
      headerName: 'Title',
    },
    {
      field: 'album',
      headerName: 'Album',
    },
    {
      field: 'jammies',
      headerName: 'Number of Penn Jammers',
    },
    {
      field: 'likes',
      headerName: 'Like',
    },
  ];

  const artistColumns = [
    {
      field: 'rank',
      headerName: 'Rank',
    },
    {
      field: 'artist',
      headerName: 'Artist',
    },
    {
      field: 'genre',
      headerName: 'Genre',
    },
    {
      field: 'jammies',
      headerName: 'Number of Penn Jammers',
    },
  ];

  const setContent1 = () => {
    setContent('Song');
  };

  const setContent2 = () => {
    setContent('Artist');
  };

  let comp;
  if (content === 'Song') {
    comp = <LazyTable route="http://localhost:8000/songs" columns={songColumns} />;
  } else {
    comp = <LazyTable route="http://localhost:8000/artists" columns={artistColumns} />;
  }

  return (
    <Center h="100vh">
      <Stack>
        <Title align="center" size={60}>
          Penn Relays, Music Edition
        </Title>

        <Paper padding="md" shadow="xs">

          <Group
            mx={55}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1rem',
            }}
          >

            <Button onClick={setContent1} style={{ marginRight: '1rem' }}>Song Leaderboard</Button>
            <Button onClick={setContent2}>Artist Leaderboard</Button>

            <Stack>
              <Select
                data={[
                  { value: 7, label: '7 days' },
                  { value: 14, label: '14 days' },
                  { value: 30, label: '30 days' },
                  { value: 180, label: '6 months' },
                ]}
                label="Timeframe"
                searchable={false}
              />
            </Stack>
          </Group>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          {comp}
        </Paper>
      </Stack>
    </Center>
  );
}
