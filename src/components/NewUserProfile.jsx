import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Tabs, Avatar, Group, Title, Space, Button,
} from '@mantine/core';
import Friends from './FriendsTable';
import Communities from './CommunitiesTable';
import Conversations from './ConversationsTable';
import Playlists from './PlaylistsTable';

function UserGroup() {
  const { userId } = useParams();
  const [userData, setUserData] = useState([]);
  const [friendState, setFriendState] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/other-users/${userId}`)
      .then((res) => res.json())
      .then((resJson) => setUserData(resJson));
  }, [userId]);

  return (
    <Group position="center">
      <Avatar radius="300px" size="xl" color="dark" src={userData.avatar} />
      <Title fz="100">
        {userData.name}
      </Title>
      <Button color="red" onClick={() => setFriendState(!friendState)}>
        {friendState ? 'Add Friend' : 'Requested'}
      </Button>
    </Group>
  );
}

function NewUserProfile() {
  const [activeTab, setActiveTab] = useState('Playlists');

  return (
    <>
      <Space h="xl" />
      <UserGroup item />
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

export default NewUserProfile;
