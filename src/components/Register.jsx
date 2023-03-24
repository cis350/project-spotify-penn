/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import '@fontsource/inter';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Space,
  Alert,
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
import { IconAlertCircle } from '@tabler/icons-react';
import { newUser } from '../api/getData';
import logo from '../assets/logo.png';

function Register() {
  const navigate = useNavigate();
  const [inUse, setInUse] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validate: {
      firstName: (val) => (val.length <= 1 ? 'First name should include at least 2 characters' : null),
      lastName: (val) => (val.length <= 1 ? 'Last name should include at least 2 characters' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6
        ? 'Password should include at least 6 characters'
        : null),
    },
  });

  const onSubmitHandler = () => {
    const {
      firstName, lastName, email, password,
    } = form.values;

    newUser(email, firstName, lastName, password).then(navigate('/login')).catch((error) => {
      if (error.message === 'Request failed with status code 500') {
        setInUse(true);
      }
      console.error(error);
    });
  };

  return (
    <Container size={420} my={20}>
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
      <Paper withBorder shadow="md" p={30} mt={10} radius="md">
        <form onSubmit={form.onSubmit(() => onSubmitHandler())}>
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
                error={form.errors.firstName}
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
                error={form.errors.lastName}
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
              mt="xs"
              radius="md"
              size="md"
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
              {inUse
          && (
            <>
              <Space h="md" />
              <Alert icon={<IconAlertCircle size="1rem" />} title="Invalid Sign-up!" color="red">
                <Text size={12}>This email is already in use, please log in.</Text>
              </Alert>
            </>
          )}
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
