/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Popover, Button, TextInput, Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { newCommunity } from '../api/communities';

function CreateCommunity(props) {
  const form = useForm({
    initialValues: {
      name: '',
      desc: '',
    },

    validate: {
      name: (val) => (val.length <= 5 ? 'name must be at least 6 characters' : null),
      desc: (val) => (val.length <= 0 ? 'description cannot be empty' : null),
    },
  });

  const handleCreateCommunity = () => {
    const { name, desc } = form.values;
    newCommunity(name, desc).then(() => {
      form.reset();
      props.onCommunityCreated();
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleCreateCommunity();
    }
  };
  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md" onKeyDown={handleKeyDown}>
      <Popover.Target>
        <Button ml={400}>Create New Community</Button>
      </Popover.Target>
      <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
        <form onSubmit={form.onSubmit(() => handleCreateCommunity())}>
          <TextInput
            value={form.values.name}
            error={form.errors.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            label="Community Name"
            placeholder="Community Name"
            size="xs"
          />
          <TextInput
            value={form.values.desc}
            error={form.errors.desc}
            onChange={(event) => form.setFieldValue('desc', event.currentTarget.value)}
            label="Community Description"
            placeholder="Describe your community"
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

export default CreateCommunity;
