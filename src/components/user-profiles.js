import { useState } from 'react';
import { Tabs, Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea } from '@mantine/core';


function UserProfile() {
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
      <Tabs.Panel value="Friends">Friends panel</Tabs.Panel>
      <Tabs.Panel value="Conversations">
        <button>Start New Conversations</button>
      </Tabs.Panel>
      <Tabs.Panel value="Communities">Communities panel</Tabs.Panel>
    </Tabs>
  );
}





