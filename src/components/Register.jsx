/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from '@mantine/form';
import '@fontsource/inter';

import { Link } from 'react-router-dom';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Checkbox,
  Anchor,
  Box,
  Stack,
  Grid,
  Button,
  Container,
  Title,
  Center,
  Image,
} from '@mantine/core';
import logo from '../assets/logo.png';

function Register() {
  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6
        ? 'Password should include at least 6 characters'
        : null),
    },
  });

  const onSubmitHandler = (event) => {
    const { firstName } = form.values;
    const { lastName } = form.values;
    const { email } = form.values;
    const { password } = form.values;

    fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: email,
        firstName,
        lastName,
        password,
      }),
    }).then((response) => response.json()).then((data) => {
      // eslint-disable-next-line no-console
      console.log(data);
    });
  };

  return (
    <Container size={420} my={40}>
      <Title
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
        <Image miw={400} src={logo} alt="spotify-at-penn-logo" />
      </Center>
      <Paper withBorder shadow="md" p={30} mt={20} radius="md">
        <form onSubmit={onSubmitHandler}>
          <Stack>
            <Group spacing="sm" grow>
              <TextInput
                required
                label="First Name"
                placeholder="First name"
                variant="filled"
                size="sm"
                value={form.values.firstName}
                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                radius="md"
              />

              <TextInput
                required
                label="Last Name"
                placeholder="Last name"
                variant="filled"
                size="sm"
                value={form.values.lastName}
                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                radius="md"
              />
            </Group>

            <TextInput
              required
              label="Email"
              variant="filled"
              size="sm"
              placeholder="example@example.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              variant="filled"
              size="sm"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={
                    form.errors.password
                    && 'Password should include at least 6 characters'
                  }
              radius="md"
            />

            <Button
              type="submit"
              mt="md"
              radius="md"
              size="md"
              sx={{
                '&:hover': {
                  backgroundColor: '#eee',
                },
              }}
            >
              Sign Up
            </Button>
            <Group position="center">
              <Text mr={-10} style={{ fontSize: 14, fontFamily: 'Inter' }}>
                Have an account?
              </Text>
              <Link
                component={Link}
                to="/login"
                style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#000D70',
                }}
              >
                Login
              </Link>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
