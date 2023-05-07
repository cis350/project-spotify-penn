/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
// import React from 'react';
import {
  Popover, Button, TextInput, Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
// import { newCommunity } from '../api/getCommunities';
import uploadFile from '../api/upload';

function CreateCommunity(props) {
  const [files, setFiles] = useState();
  // const [fileDir, setFileDir] = useState('');

  // event handler for file selection
  const updateFile = (evt) => {
    setFiles(evt.target.files);
  };
  // const handleUpload = async () => {
  //   // upload the file
  //   const formData = new FormData();
  //   formData.append('File_0', files);
  //   uploadFile(formData); // add file dir here
  // };

  const form = useForm({
    initialValues: {
      name: '',
      image: '',
      desc: '',
    },

    validate: {
      name: (val) => (val.length <= 5 && val.length >= 13 ? 'name must be at least 6 characters but not more than 12 characters' : null),
      desc: (val) => (val.length <= 0 ? 'description cannot be empty' : null),
    },
  });

  const handleCreateCommunity = () => {
    const { name, image, desc } = form.values;
    console.log(name);
    console.log(image);
    console.log(desc);
    console.log(files);

    console.log(files[0]);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('desc', desc);
    formData.append('numMember', 1);
    formData.append('File_0', files[0]);

    // add file dir here
    uploadFile(formData).then(() => {
      form.reset();
      props.onCommunityCreated();
    });

    // set fileDir here -- insert whatever function that returns the aws link here.
    // newCommunity(name, image, desc).then(() => {
    //   form.reset();
    //   props.onCommunityCreated();
    // });
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
          <div>
            <input
              id="upld"
              value={form.values.image}
              type="file"
              name="someFiles"
              onChange={(e) => {
                console.log('adding file');
                form.setFieldValue('image', e.currentTarget.value);
                updateFile(e);
                // setFiles(evt.target.files);
                // handleUpload();
              }}
            />
          </div>
          <Center>
            <Button mt={10} type="submit">
              Submit
            </Button>
          </Center>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}

export default CreateCommunity;
