import React, { useState } from 'react';
import {
  Tabs, Avatar, Group, Title, Space,
} from '@mantine/core';
import Friends from './FriendsTable';
import Communities from './CommunitiesTable';
import Playlists from './PlaylistsTable';
import { getFullName } from '../api/getUserData';

const name = getFullName;

function UserGroup() {
  return (
    <Group position="center">
      <Avatar radius="300px" size="xl" color="dark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxU_HXn8zNqrMo5wdVZmnqOEZk4O708Zt1ZEEb2jBtPj50tjZ-0J4Y_N9lISrYk-PWVS0&usqp=CAU" />
      <Title fz="100">
        {name}
      </Title>
    </Group>
  );
}

function UserProfile() {
  const [activeTab, setActiveTab] = useState('Playlists');

  return (
    <>
      <Space h="xl" />
      <UserGroup />
      <Space h="40px" />
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="Playlists">Playlists</Tabs.Tab>
          <Tabs.Tab value="Friends">Friends</Tabs.Tab>
          <Tabs.Tab value="Communities">Communities</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Playlists">
          <Playlists />
        </Tabs.Panel>
        <Tabs.Panel value="Friends">
          <Friends />
        </Tabs.Panel>
        <Tabs.Panel value="Communities">
          <Communities />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default UserProfile;
