/* eslint-disable no-underscore-dangle */

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Table, Group, Text, ScrollArea, Center, Button, Input, Flex, Space, Container,
} from '@mantine/core';
import { getOtherUsers, followUser } from '../api/getUsers';

export function FriendsTable() {
  const [rows, setRows] = useState(null);
  const [currName, setName] = useState('');

  const handleSearchInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSearchClick = () => {

  };

  useEffect(() => {
    getOtherUsers()
      .then((data) => {
        if (data.length === 0) {
          throw new Error('empty data');
        }
        setRows(
          data.filter((item) => item.firstName.startsWith(currName)).map((item) => (
            <tr key={item._id}>
              <td>
                <Group spacing="md">
                  <NavLink to={`/profile/${item._id}`}>
                    {/* <Avatar size={75} src={item.avatar} radius={75} /> */}
                    <Text fz="lg" fw={500}>
                      {item.firstName}
                    </Text>
                  </NavLink>
                  <Button color="red" onClick={() => followUser(item._id)}>
                    {item.follows ? 'Unfollow' : 'Follow'}
                  </Button>

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
  }, [currName]);

  return (

    <Container my="md">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap="sm"
        align="center"
        style={{ margin: '10px' }}
      >
        <Input
          placeholder="Search Users"
          onChange={handleSearchInputChange}
          style={{ width: '400px' }}
          radius="xl"
        />
        <Button onClick={handleSearchClick} size="xs" radius="xl">
          Search
        </Button>
      </Flex>
      <Space h="xl" />

      <Center>
        <ScrollArea>
          <Table sx={{ minWidth: 800 }} verticalSpacing="md">
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Center>

    </Container>

  );
}

export default FriendsTable;
