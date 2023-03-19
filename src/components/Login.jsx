import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import '@fontsource/inter';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fontsource/rubik';
// eslint-disable-next-line no-unused-vars
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
import logo from '../assets/logo.png';

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState(true);

  const form = useForm({
    initialValues: {
      email: '',
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

  const handleSubmit = () => {
    const { email } = form.values;
    const { password } = form.values;

    fetch(`http://localhost:8000/user/${email}`).then((response) => response.json()).then((data) => {
      if (Object.keys(data).length === 0) {
        setLogin(false);
        form.reset();
      } else if (data.password === password) {
        setLogin(true);
        navigate('/home');
      } else {
        setLogin(false);
        form.reset();
      }
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

      <Text color="dimmed" size="sm" align="center" mt={5}>
        Don&#39;t have an account yet?
        {' '}
        <Link
          component={Link}
          to="/register"
          style={{
            fontFamily: 'Rubik',
            fontSize: 14,
            fontWeight: 400,
            color: '#288CE4',
          }}
        >
          Create account.
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={20} radius="md">

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <TextInput
            label="Email"
            placeholder="you@upenn.edu"
            required
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
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
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 400,
                color: '#288CE4',
              }}
            >
              Forgot password?
            </Link>
          </Group>
          <Button type="submit" fullWidth mt="xl" sx={{ background: 'red' }} radius="md">
            Sign in
          </Button>
        </form>
        {!login
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
