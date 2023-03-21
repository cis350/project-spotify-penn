/* eslint-disable no-console */
import {
  Avatar, Table, Group, Text, ScrollArea, Center,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';

export function FriendsTable() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/friends')
      .then((res) => res.json())
      .then((data) => {
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
      .catch((error) => console.error(error));
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
