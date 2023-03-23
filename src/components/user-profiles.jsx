import React, { useState } from 'react';
import {
  Tabs, Avatar, Group, Title, Space,
} from '@mantine/core';
import Friends from './Friends-table';
import Communities from './Communities-table';
import Conversations from './Conversations-table';
import Playlists from './Playlists-table';

function UserGroup() {
  return (
    <Group position="center">
      <Avatar radius="300px" size="xl" color="dark" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxU_HXn8zNqrMo5wdVZmnqOEZk4O708Zt1ZEEb2jBtPj50tjZ-0J4Y_N9lISrYk-PWVS0&usqp=CAU" />
      <Title fz="100"> Benjamin Franklin</Title>
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
          <Tabs.Tab value="Playlists">Playlist tab</Tabs.Tab>
          <Tabs.Tab value="Friends">Friends tab</Tabs.Tab>
          <Tabs.Tab value="Conversations">Conversations tab</Tabs.Tab>
          <Tabs.Tab value="Communities">Communities tab</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Playlists">
          <Playlists />
        </Tabs.Panel>
        <Tabs.Panel value="Friends">
          <Friends />
        </Tabs.Panel>
        <Tabs.Panel value="Conversations">
          <Conversations />
        </Tabs.Panel>
        <Tabs.Panel value="Communities">
          <Communities />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default UserProfile;
