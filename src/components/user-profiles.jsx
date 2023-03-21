/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import {
  Tabs, Button, Center, Avatar, Group, Title, Space,
} from '@mantine/core';
import FriendsTable from './friends-table.jsx';
import CommunitiesTable from './communities-table.jsx';
import ConversationsTable from './conversations-table.jsx';

function UserGroup() {
  return (
    <Group position="center">
      <Avatar radius="300px" size="xl" color="dark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxU_HXn8zNqrMo5wdVZmnqOEZk4O708Zt1ZEEb2jBtPj50tjZ-0J4Y_N9lISrYk-PWVS0&usqp=CAU" />
      <Title fz="100"> Benjamin Franklin</Title>
    </Group>
  );
}

function UserProfile(prop) {
  const [activeTab, setActiveTab] = useState('Playlists');

  return (
    <>
      <Space h="xl" />
      <UserGroup />
      <Space h="40px" />
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="Playlists">Playlist tab</Tabs.Tab>
          <Tabs.Tab value="Friends">Friends tab</Tabs.Tab>
          <Tabs.Tab value="Conversations">Conversations tab</Tabs.Tab>
          <Tabs.Tab value="Communities">Communities tab</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Playlists">
          <Center>
            <Space h="40px" />
            {' '}
            <Button>Add New Playlists</Button>
            {' '}
          </Center>
        </Tabs.Panel>
        <Tabs.Panel value="Friends">
          <FriendsTable friends={prop.friends} />
        </Tabs.Panel>
        <Tabs.Panel value="Conversations">
          <ConversationsTable />
        </Tabs.Panel>
        <Tabs.Panel value="Communities">
          <CommunitiesTable />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default UserProfile;
