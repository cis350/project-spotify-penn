import {
  Avatar, Table, Group, Text, ScrollArea, Center, Button,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import getFriends from '../api/getFriends';

export function FriendsTable() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getFriends()
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          throw new Error('empty data');
        }
        setRows(
          data.map((item) => (
            <tr key={item.name}>
              <td>
                <Group spacing="md">
                  <Avatar size={75} src={item.avatar} radius={75} />
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
                Find Friends
              </Button>
            </Group>
          </td>
        </tr>,
      ));
  }, []);

  return (
    <Center>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="md">
          <thead>
            <tr>
              <th><Text fz={50}>Friends</Text></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
}

export default FriendsTable;
