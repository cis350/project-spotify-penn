import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Avatar, Table, Group, Text, ScrollArea, Center, Button,
} from '@mantine/core';
import getOtherUsers from '../api/getUsers';

export function FriendsTable() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    getOtherUsers()
      .then((data) => {
        if (data.length === 0) {
          throw new Error('empty data');
        }
        setRows(
          data.map((item) => (
            <tr key={item.name}>
              <td>
                <Group spacing="md">
                  <NavLink to={`/profile/${item.id}`}>
                    <Avatar size={75} src={item.avatar} radius={75} />
                    <Text fz="lg" fw={500}>
                      {item.name}
                    </Text>
                  </NavLink>
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
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
}

export default FriendsTable;
