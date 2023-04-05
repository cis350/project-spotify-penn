import { getCommunities } from "../api/getCommunities";

jest.mock('../api/getCommunities.js');

getCommunities.mockResolvedValue({
  name: 'test1', image: "https://cdn.vox-cdn.com/thumbor/rUje72-KDI-XYKbKnvYxov-ueyQ=/0x0:1000x655/1400x1050/filters:focal(420x248:580x408):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/48671171/shutterstock_114033616.0.jpg", numMember: "4", desc: "abc"
});

test('community name is test1', async () => {
  const data = await getSongs();
  expect(data.name).toBe('abc');
});

test('community', async () => {
  const data = await getSongs();
  expect(data.image).not.tobeNull();
});

test('test number of members', async () => {
  const data = await getSongs();
  expect(parseInt(data.numMember)).toBe(4);
});

test('there should be description', async () => {
  const data = await getSongs();
  expect(data.desc).not.toBeNull();
});