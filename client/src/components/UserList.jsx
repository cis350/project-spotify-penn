import React from 'react';
import {
  Space,
} from '@mantine/core';
import NewFriends from './NewFriendsTable';

function UserList() {
  return (
    <>
      <Space h="xl" />
      {/* <Title align="center"> Users </Title> */}
      <NewFriends />
      <Space h="40px" />
    </>
  );
}
export default UserList;
