import React from 'react';
import { Title } from '@mantine/core';

function Home() {
  return (
    <Title
      align="center"
      sx={(theme) => ({
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
      })}
    >
      Welcome back!
    </Title>
  );
}

export default Home;
