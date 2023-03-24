import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <MantineProvider
      theme={{
        colors: {
          'spotify-green': ['#1DB954', '#20D464'],
        },
        colorScheme: 'dark',
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <App />
    </MantineProvider>
  </BrowserRouter>,
);
