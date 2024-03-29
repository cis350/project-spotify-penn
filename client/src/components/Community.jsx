import React, { useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import PropTypes from 'prop-types';
import {
  Container, Input, Button, Flex, createStyles, Paper, Title, Text, rem, Space,
} from '@mantine/core';
import CreateNewCommunity from './CreateCommunity';
import { getCommunities, toggleJoin } from '../api/getCommunities';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 500,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(25),
    marginTop: theme.spacing.xs,
  },

  numMember: {
    color: theme.black,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
    zIndex: 2,
  },
}));

function Card({ item }) {
  const { classes } = useStyles();
  const {
    image, name, numMember, member,
  } = item;
  // const [joinStatus, setJoinStatus] = useState(false);

  const handleClick = (i) => {
    try {
      toggleJoin(i);
    } catch (error) { /* do nothing */ }
  };

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.numMember} size="xs">
          {`${parseInt(numMember, 10)} ${parseInt(numMember, 10) === 1 ? 'member' : 'members'}`}
        </Text>
        <Title order={3} className={classes.name}>
          {name}
        </Title>
      </div>
      <Button variant="white" color="dark" onClick={() => handleClick(item)}>
        {member ? 'Joined' : 'Join Community'}
      </Button>
    </Paper>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    numMember: PropTypes.number.isRequired,
    member: PropTypes.bool.isRequired,
  }).isRequired,
};

export function Community() {
  const [carousel, setCarousel] = useState(null);
  const [currName, setName] = useState('');

  const handleSearchInputChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    getCommunities()
      .then((data) => {
        if (data.length === 0) {
          throw new Error('empty data');
        }
        setCarousel(
          data.filter((item) => item.name.startsWith(currName)).map((item) => (
            <Carousel.Slide key={item.name}>
              <Card item={item} />
            </Carousel.Slide>
          )),
        );
      })
      .catch(() => setCarousel(
        <tr>
          <td>
            <Text> </Text>
          </td>
        </tr>,
      ));
  }, [currName]);

  const handleCreateCommunity = () => {
  };

  return (
    <Container my="md">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap="sm"
        align="center"
        style={{ margin: '10px' }}
      >
        <Input
          placeholder="Search Communities"
          onChange={handleSearchInputChange}
          style={{ width: '400px' }}
          radius="xl"
        />
        <Button size="xs" radius="xl">
          Search
        </Button>
      </Flex>
      <Space h="xl" />

      <CreateNewCommunity onCommunityCreated={handleCreateCommunity} />
      <Space h={50} />
      <Carousel
        slideSize="25%"
        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
        slideGap="xl"
        align="start"
        slidesToScroll="2"
      >
        {carousel}
      </Carousel>
    </Container>
  );
}

export default Community;
