import React from 'react';
import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Burger,
  rem,
  Image,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

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
  const [drawerOpened, { toggle: toggleDrawer }] = useDisclosure(false);
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Box pb={10}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href="/">
              <Image
                width={180}
                height={50}
                fit="contain"
                src="https://drive.google.com/uc?export=view&id=15by11GBK3ZHEukwOi-lQchSMbG9DZxpp"
                alt="logo"
              />
            </a>

            <a href="/" className={classes.link}>
              Leaderboard
            </a>
            <a href="/" className={classes.link}>
              PennMix
            </a>
            <a href="/" className={classes.link}>
              Community
            </a>
            <a href="/chat" className={classes.link}>
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
              href={`http://localhost:${window.location.port}/profile`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxU_HXn8zNqrMo5wdVZmnqOEZk4O708Zt1ZEEb2jBtPj50tjZ-0J4Y_N9lISrYk-PWVS0&usqp=CAU"
              alt="User"
              radius="xl"
            />
            <Button color="dark" onClick={(() => navigate('/login'))}>Log out</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>
    </Box>
  );
}

export default MainHeader;
