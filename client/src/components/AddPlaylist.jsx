/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Popover, Button, TextInput, Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { postNewUserPlaylist } from '../api/getUserPlaylists';
import { postPlaylists } from '../api/getAllPlaylists';

export function AddPlaylist(props) {
  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      desc: '',
    },

    validate: {
      id: (val) => (!val.trim() ? 'id cannot be empty' : null),
      name: (val) => (!val.trim() ? 'name cannot be empty' : null),
      desc: (val) => (!val.trim() ? 'description cannot be empty' : null),
    },
  });

  const handleCreatePlaylist = () => {
    const { id, name, desc } = form.values;
    postNewUserPlaylist(id, name, desc).then(() => {
      postPlaylists(name, desc);
      form.reset();
      props.onPlaylistCreated();
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreatePlaylist();
    }
  };
  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md" onKeyDown={handleKeyDown} closeOnClickOutside closeOnEscape>
      <Popover.Target>
        <Button>Upload New Playlist</Button>
      </Popover.Target>
      <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
        <form onSubmit={form.onSubmit(() => handleCreatePlaylist())}>
          <TextInput
            value={form.values.name}
            error={form.errors.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            label="Playlist Name"
            placeholder="Playlist Name"
            size="xs"
          />
          <TextInput
            value={form.values.desc}
            error={form.errors.desc}
            onChange={(event) => form.setFieldValue('desc', event.currentTarget.value)}
            label="Playlist Description"
            placeholder="chill study vibes"
            size="xs"
            mt="xs"
          />
          <TextInput
            onChange={(event) => form.setFieldValue('id', event.currentTarget.value)}
            value={form.values.id}
            error={form.errors.id}
            label="Playlist ID"
            placeholder="3cEYpjA9oz9GiPac4AsH4n"
            size="xs"
            mt="xs"
          />
          <Center>
            <Button mt={10} type="submit">Submit</Button>
          </Center>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}

export default AddPlaylist;
