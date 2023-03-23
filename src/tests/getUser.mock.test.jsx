import getUsers from '../api/getLoginUser';

jest.mock('../api/getLoginUser.jsx');

getUsers.mockResolvedValue({
  id: 'admin@gmail.com', firstName: 'admin', lastName: 'admin', password: 'password',
});

test('the first name is admin', async () => {
  const data = await getUsers('admin@gmail.com');
  expect(data.main.firstName).toBe('admin');
});

test('the last name is admin', async () => {
  const data = await getUsers('admin@gmail.com');
  expect(data.main.lastName).toBe('admin');
});

test('the password is password', async () => {
  const data = await getUsers('admin@gmail.com');
  expect(data.main.password).toBe('password');
});
