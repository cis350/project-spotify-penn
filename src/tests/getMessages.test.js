/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { getMessages } from '../api/messages';

jest.mock('axios');

test('getMessages should return an array of messages for the given socket', async () => {
  const mockMessages = [{ id: 1, text: 'Hello' }, { id: 2, text: 'World' }];
  axios.get.mockResolvedValueOnce({ data: { messages: mockMessages } });

  const socket = 'ABC123';
  const result = await getMessages(socket);

  expect(result).toEqual(mockMessages);

  expect(axios.get).toHaveBeenCalledWith(`http://localhost:8000/sockets/${socket}`);
});

test('getMessages should throw an error if there is a network error', async () => {
  axios.get.mockRejectedValueOnce(new Error('Network Error'));

  const socket = 'ABC123';

  await expect(getMessages(socket)).rejects.toThrow('Network Error');
  expect(axios.get).toHaveBeenCalledWith(`http://localhost:8000/sockets/${socket}`);
});
