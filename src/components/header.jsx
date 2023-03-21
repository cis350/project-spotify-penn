import React from 'react';
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

function MainHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Box pb={10}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Avatar src='../src/assets/logo.svg'/>
            
            <a href="/" className={classes.link}>
              Leaderboard
            </a>
            <a href="/" className={classes.link}>
              PennMix
            </a>
            <a href="/" className={classes.link}>
              Community
            </a>
            <a href="/" className={classes.link}>
              Chat
            </a>
            <a href="/" className={classes.link}>
              Vibe
            </a>
            <a href="/" className={classes.link}>
              New Artists
            </a>
          </Group>
          <Group className={classes.hiddenMobile}>
            <Avatar
              component="a"
              href="http://localhost:3000/profile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxU_HXn8zNqrMo5wdVZmnqOEZk4O708Zt1ZEEb2jBtPj50tjZ-0J4Y_N9lISrYk-PWVS0&usqp=CAU"
              alt="User"
              radius="xl"
            />
            <Button color="dark">Log out</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="/" className={classes.link}>
            Leaderboard
          </a>
          <a href="/" className={classes.link}>
            PennMix
          </a>
          <a href="/" className={classes.link}>
            Community
          </a>
          <a href="/" className={classes.link}>
            Chat
          </a>
          <a href="/" className={classes.link}>
            Vibe
          </a>
          <a href="/" className={classes.link}>
            New Artists
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log out</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default MainHeader;
