import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import FriendsTable from './components/friends-table.js';
import CommunitiesTable from './communities-table.js';
import ConversationsTable from './conversations-table.js';

function UserProfile(prop) {
  const [activeTab, setActiveTab] = useState<string | null>('Playlists');

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="Playlists">Playlist tab</Tabs.Tab>
        <Tabs.Tab value="Friends">Friends tab</Tabs.Tab>
        <Tabs.Tab value="Conversations">Conversations tab</Tabs.Tab>
        <Tabs.Tab value="Communities">Communities tab</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Playlists">
        <button>Add New Playlists</button>
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
  );
}

export default UserProfile;




