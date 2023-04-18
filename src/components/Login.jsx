/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  Container,
  Title,
  TextInput,
  PasswordInput,
  Group,
  Paper,
  Checkbox,
  Text,
  Button,
  Alert,
  Space,
  Image,
  Center,
} from '@mantine/core';
// import SpotifyWebApi from 'spotify-web-api-js';
import { darkLogo } from '../assets/logos';
import { getPassword } from '../api/getUserData';

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function Login() {
  const navigate = useNavigate();

  const clientId = '8a1688a9dcda4c06b6de6b77453d3f68';
  const redirectUri = 'http://localhost:3000/home';

  const state = generateRandomString(16);

  localStorage.setItem('stateKey', state);
  const scope = 'user-read-private user-read-email';

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += `&client_id=${encodeURIComponent(clientId)}`;
  url += `&scope=${encodeURIComponent(scope)}`;
  url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;
  url += `&state=${encodeURIComponent(state)}`;

  // const spotifyApi = new SpotifyWebApi();
  // const redirectUri = 'http://localhost:3000/callback';

  const [loginError, setLoginError] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6
        ? 'Password should include at least 6 characters'
        : null),
    },
  });

  const handleSubmit = () => {
    const { email, password } = form.values;

    getPassword(email).then((userData) => {
      if (userData.password === password) {
        const sessionId = userData.id;
        window.sessionStorage.setItem('sessionId', sessionId);
        navigate(url);
      } else {
        setLoginError(true);
        form.reset();
      }
    }).catch(() => {
      setLoginError(true);
      form.reset();
    });
  };

  return (
    <Container size={420} my={20}>
      <Title
        color="white"
        align="center"
        size={60}
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to
      </Title>
      <Center>
        <Image miw={400} src={darkLogo} alt="spotify-at-penn-logo" />
      </Center>

      <Paper withBorder shadow="md" p={30} mt={10} radius="md">

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <TextInput
            size="sm"
            label="Email"
            placeholder="you@upenn.edu"
            variant="filled"
            required
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <PasswordInput
            size="sm"
            label="Password"
            placeholder="Your password"
            variant="filled"
            required
            mt="md"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={
            form.errors.password
            && 'Password should include at least 6 characters'
          }
            radius="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Link
              component={Link}
              to="/home"
              style={{
                fontFamily: 'Rubik',
                fontSize: 14,
                fontWeight: 400,
                color: '#288CE4',
              }}
            >
              Forgot password?
            </Link>
          </Group>
          <Button size="md" type="submit" fullWidth mt="lg" radius="md">
            Sign in
          </Button>
        </form>
        <Text size={14} align="center" mt={10}>
          Don&#39;t have an account yet?
          {' '}
          <Link
            component={Link}
            to="/register"
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: '#288CE4',
            }}
          >
            Create account.
          </Link>
        </Text>
        {loginError
          && (
            <>
              <Space h="md" />
              <Alert icon={<IconAlertCircle size="1rem" />} title="Invalid Login!" color="red" />
            </>
          )}
      </Paper>

    </Container>
  );
}

export default Login;
