import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import '@fontsource/inter';
// eslint-disable-next-line no-unused-vars
import { IconAlertCircle } from '@tabler/icons-react';
import {
  Container,
  Title,
  Anchor,
  TextInput,
  PasswordInput,
  Group,
  Paper,
  Checkbox,
  Text,
  Button,
  Alert,
  Space,
} from '@mantine/core';

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

    fetch(`http://localhost:3000/user/${email}`).then((response) => response.json()).then(((data) => {
      if (Object.keys(data).length === 0) {
        // eslint-disable-next-line no-lone-blocks
        setLogin(false);
        form.reset();
      } else if (data.password === password) {
        setLogin(true);
        navigate('/home');
      } else {
        setLogin(false);
        form.reset();
      }
    }));
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?
        {' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">

        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <TextInput
            label="Email"
            placeholder="you@upenn.edu"
            required
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
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
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
        {!login
          && (
            <>
              <Space h="md" />
              <Alert icon={<IconAlertCircle size="1rem" />} title="Incorrect Password!" color="red" />
            </>
          )}
      </Paper>
    </Container>
  );
}

export default Login;
