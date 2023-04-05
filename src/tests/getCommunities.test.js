import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCommunities } from '../api/getCommunities';

const mockAxios = new MockAdapter(axios);

describe('the api returned correct communities', () => {
  mockAxios.onGet().reply(200, {
    name: "ABC",
    image: "https://doublejj.com/wp-content/uploads/2018/03/2880x1800-cream-solid-color-background.jpg",
    numMember: "2",
    desc: "no description"
  });

  test('Community name is ABC', async () => {
    const data = await getCommunities();
    expect(data.name).toBe('ABC');
  });

  test('image is correct', async () => {
    const data = await getSongs();
    expect(data.image).toBe('https://doublejj.com/wp-content/uploads/2018/03/2880x1800-cream-solid-color-background.jpg');
  });

  test('the number of members', async () => {
    const data = await getSongs();
    expect(data.numMember).toBe("2");
  });

  test('test description is not empty', async () => {
    const data = await getSongs();
    expect(data.desc).not.toBeNull();
  });
});