/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getUsers from '../api/getLoginUser';

const mockAxios = new MockAdapter(axios);

describe('the api returned correct data for admin@gmail.com', () => {
  mockAxios.onGet().reply(200, {
    id: 'admin@gmail.com', firstName: 'admin', lastName: 'admin', password: 'password',
  });

  test('the id is admin@gmail.com', async () => {
    const data = await getUsers();
    expect(data.id).toBe('admin@gmail.com');
  });

  test('the first name is correct', async () => {
    const data = await getUsers();
    expect(data.firstName).toBe('admin');
  });

  test('the last name is correct', async () => {
    const data = await getUsers();
    expect(data.lastName).toBe('admin');
  });

  test('the password is correct', async () => {
    const data = await getUsers();
    expect(data.password).toBe('password');
  });
});
