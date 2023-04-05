import {
  Table, Group, Text, ScrollArea, Center, Stack, Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import AddNewPlaylist from './AddPlaylist';
import { getPlaylists } from '../api/userPlaylists';

export function PlaylistTable() {
  const [rows, setRows] = useState([]);

  const handlePlaylistCreated = () => {
    // Fetch the updated playlist data and update the state
    getPlaylists()
      .then((data) => {
        if (data.length === 0) {
          throw new Error('empty data');
        }
        setRows(
          data.map((item) => (
            <tr key={item.name}>
              <td>
                <Group spacing="sm">
                  <Text fz="lg" fw={500}>
                    {item.name}
                  </Text>
                  <Text fz="md" fw={200}>
                    {item.desc}
                  </Text>
                </Group>
              </td>
            </tr>
          )),
        );
      })
      .catch(() => setRows(
        <tr>
          <td />
        </tr>,
      ));
  };

  useEffect(() => {
    handlePlaylistCreated();
  }, []);

  return (
    <Center>
      <Stack>
        <Title mt={25} align="center">
          Playlists
          <ScrollArea h={300}>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Title>
        <AddNewPlaylist onPlaylistCreated={handlePlaylistCreated} />
      </Stack>
    </Center>
  );
}

export default PlaylistTable;
