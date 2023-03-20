 import {
    createStyles,
    Header,
    Group,
    Button,
    UnstyledButton,
    Text,
    ThemeIcon,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem
  } from '@mantine/core';
  import { Logo } from '../src/assets/logo.png';
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
  
  export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles();
  
    const links = mockdata.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));
  
    return (
      <Box pb={120}>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
            <Logo size={30} />
  
            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <a href="#" className={classes.link}>
                Leaderboard
              </a>
              <a href="#" className={classes.link}>
                PennMix
              </a>
              <a href="#" className={classes.link}>
                Community
              </a>
              <a href="#" className={classes.link}>
                Chat
              </a>
              <a href="#" className={classes.link}>
                Vibe
              </a>
              <a href="#" className={classes.link}>
                New Artists
              </a>
            </Group>
  
            // insert avatar
            <Group className={classes.hiddenMobile}>
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
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
  
            <a href="#" className={classes.link}>
                Leaderboard
              </a>
              <a href="#" className={classes.link}>
                PennMix
              </a>
              <a href="#" className={classes.link}>
                Community
              </a>
              <a href="#" className={classes.link}>
                Chat
              </a>
              <a href="#" className={classes.link}>
                Vibe
              </a>
              <a href="#" className={classes.link}>
                New Artists
              </a>
  
            <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            // change out to avatar
            <Group position="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
    );
  }





  /**
    <AppShell
      padding="md"
      header={<Header height={60} p="xs">{Header}</Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
    insert app contents here
    </AppShell>
  */