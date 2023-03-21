/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from '@mantine/form';
import '@fontsource/inter';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    event.preventDefault();
    const {
      firstName, lastName, email, password,
    } = form.values;

    axios.post(
      'http://localhost:8000/user',
      {
        id: email,
        firstName,
        lastName,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then((response) => {
      const { data } = response;
      console.log(data);
      navigate('/login');
    })
      .catch((error) => {
        console.error(error);
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
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#288CE4',
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
