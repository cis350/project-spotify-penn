import React, { useState, useEffect } from 'react';
import {
  Tabs, Avatar, Group, Title, Space,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Friends from './FriendsTable';
import Communities from './CommunitiesTable';
import Playlists from './PlaylistsTable';
import { getFullName } from '../api/getUserData';

function UserGroup() {
  const [fullName, setFullName] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem('sessionId') === null) {
      navigate('/login');
    } else {
      setCurrentUser(window.sessionStorage.getItem('sessionId'));
    }
  }, []);

  useEffect(() => {
    getFullName(currentUser).then((data) => {
      setFullName(data);
    });
  }, [currentUser]);

  return (
    <Group position="center">
      <Avatar radius="300px" size="xl" color="dark" src={window.sessionStorage.getItem('imageURL')} />
      <Title fz="100">
        {' '}
        {fullName}
        {' '}
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
