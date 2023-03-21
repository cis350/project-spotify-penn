import {
  Table, Group, Text, ScrollArea, Center, Button,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';

export function PlaylistTable() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/playlists')
      .then((res) => res.json())
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
                </Group>
              </td>
            </tr>
          )),
        );
      })
      .catch(() => setRows(
        <tr>
          <td>
            <Group spacing="sm" position="center">
              <Button>
                Upload New Playlist
              </Button>
            </Group>
          </td>
        </tr>,
      ));
  }, []);

  return (
    <Center>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th><Text fz={50}>Playlists</Text></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
}

export default PlaylistTable;
