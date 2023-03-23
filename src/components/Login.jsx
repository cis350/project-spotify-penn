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
  // const { login } = useAuth();

  const [loginError, setLoginError] = useState(false);

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
        setLoginError(true);
        form.reset();
      } else if (data.password === password) {
        navigate('/home');
      } else {
        setLoginError(true);
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

      <Paper withBorder shadow="md" p={30} mt={10} radius="md">

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <TextInput
            size="md"
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
            size="md"
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
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 400,
                color: '#288CE4',
              }}
            >
              Forgot password?
            </Link>
          </Group>
          <Button size="md" type="submit" fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </form>
        <Text size="sm" align="center" mt={10}>
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