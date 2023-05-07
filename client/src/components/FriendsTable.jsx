import {
  Avatar, Table, Group, Text, ScrollArea, Center, Button,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import getFriends from '../api/getUserFriends';

export function FriendsTable() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const goToVibes = () => {
    navigate('/users');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFriends();
        const data = await res.json();

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
      } catch (error) {
        setRows(
          <tr>
            <td>
              <Group spacing="sm" position="center">
                <Button onClick={goToVibes}>Find Friends</Button>
              </Group>
            </td>
          </tr>,
        );
      }
    };

    fetchData();
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
