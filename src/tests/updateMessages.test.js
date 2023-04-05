/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { updateMessages } from '../api/messages';

jest.mock('axios');

test('updateMessages should update messages for the given socket', async () => {
  const mockResponse = { success: true };
  axios.put.mockResolvedValueOnce({ data: mockResponse });

  const socket = 'ABC123';
  const newMessages = [{ id: 1, text: 'Hello' }];
  const result = await updateMessages(socket, newMessages);

  expect(result).toEqual(mockResponse);

  expect(axios.put).toHaveBeenCalledWith(
    `http://localhost:8000/sockets/${socket}`,
    { id: socket, messages: newMessages },
    { headers: { 'Content-Type': 'application/json' } },
  );
});

test('updateMessages should throw an error if there is a network error', async () => {
  axios.put.mockRejectedValueOnce(new Error('Network Error'));

  const socket = 'ABC123';
  const newMessages = [{ id: 1, text: 'Hello' }];

  await expect(updateMessages(socket, newMessages)).rejects.toThrow('Network Error');

  expect(axios.put).toHaveBeenCalledWith(
    `http://localhost:8000/sockets/${socket}`,
    { id: socket, messages: newMessages },
    { headers: { 'Content-Type': 'application/json' } },
  );
});
