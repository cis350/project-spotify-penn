/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { newConversation, getSockets } from '../api/messages';

jest.mock('axios');

test('newConversation should create a new conversation for the given socket', async () => {
  // Mock the axios post request
  const mockResponse = { success: true };
  axios.post.mockResolvedValueOnce({ data: mockResponse });

  // Call the function with a socket
  const socket = 'ABC123';
  const result = await newConversation(socket);

  // Check the result is the expected value
  expect(result).toEqual(mockResponse);

  // Check the axios.post request was called with the correct URL, data and options
  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:8000/sockets',
    { id: socket, messages: [] },
    { headers: { 'Content-Type': 'application/json' } },
  );
});

test('getSockets should return an array of socket ids', async () => {
  // Mock the axios get request
  const mockResponse = [{ id: 'ABC123' }, { id: 'DEF456' }];
  axios.get.mockResolvedValueOnce({ data: mockResponse });

  // Call the function
  const result = await getSockets();

  // Check the result is the expected value
  expect(result).toEqual(['ABC123', 'DEF456']);

  // Check the axios.get request was called with the correct URL
  expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/sockets');
});
