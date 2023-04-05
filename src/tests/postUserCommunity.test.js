import axios from 'axios';
import { postNewUserCommunity } from '../api/userCommunities';

jest.mock('axios');

test('postNewUserCommunity should throw an error if there is a network error', async () => {
  // Mock the axios post request to throw a network error
  axios.post.mockRejectedValueOnce(new Error('Network Error'));

  // Call the function with a name
  const name = 'My Community';

  // Check that the function throws an error with the correct message
  await expect(postNewUserCommunity(name)).rejects.toThrow('Network Error');

  // Check the axios.post request was called with the correct URL and data
  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:8000/joinedcommunities',
    { name },
  );
});

test('postNewUserCommunity should throw an error if there is a network error', async () => {
  // Mock the axios post request to throw a network error
  axios.post.mockRejectedValueOnce(new Error('Network Error'));

  // Call the function with a name
  const name = 'My Community';

  // Check that the function throws an error with the correct message
  await expect(postNewUserCommunity(name)).rejects.toThrow('Network Error');

  // Check the axios.post request was called with the correct URL and data
  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost:8000/joinedcommunities',
    { name },
  );
});
