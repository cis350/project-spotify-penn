import {
  Table, Group, Text, ScrollArea, Center, Button, Stack, ActionIcon,
} from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNewArtistPlaylists } from '../api/newArtistPlaylists';
import { likes, nolikes } from '../assets/likes';
import updateLikes from '../api/updateLikesNewArtist';

export function ArtistsFeed() {
  const [rows, setRows] = useState(true);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  function handleClick(item) {
    try {
      updateLikes(item).then(() => {
        setReload(!reload);
      });
    } catch (error) { /* do nothing */ }
  }

  useEffect(() => {
    try {
      getNewArtistPlaylists().then((data) => {
        setRows(
          data.reverse().map((item) => (
            <tr key={item.name}>
              <td>
                <Group spacing={50}>
                  <Text fz={50} fw={500}>
                    {item.artistName}
                  </Text>
                  <Stack spacing={0}>
                    <Text fz={40} fw={500}>
                      {item.playlistName}
                    </Text>
                    <Text fz="md" fw={500}>
                      {item.description}
                    </Text>
                  </Stack>
                  <ActionIcon onClick={() => handleClick(item)} size="xs">
                    <img src={item.likes ? likes : nolikes} alt="Likes" />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          )),
        );
      });
    } catch (e) {
      setRows(
        <tr>
          <td>
            <Group spacing={50} position="center">
              <Button onClick={() => navigate('/uploadnewartist')}>
                Upload My Music
              </Button>
            </Group>
          </td>
        </tr>,
      );
    }
  }, [reload]);

  return (
    <Center>
      <Stack spacing="xl">
        <Button onClick={() => navigate('/uploadnewartist')}>
          Upload My Music
        </Button>
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Center>
  );
}

export default ArtistsFeed;
