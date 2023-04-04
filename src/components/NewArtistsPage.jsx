/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Center, Stack, Title,
} from '@mantine/core';
import Feed from './NewArtistsFeed';

export default function NewArtistsPage() {
  return (
    <>
      <Title align="center" size={80} my={50}>
        New Artists @ Penn
      </Title>
      <Feed />
    </>
  );
}
