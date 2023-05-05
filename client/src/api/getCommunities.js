/* eslint-disable no-console */
import axios from 'axios';

const getCommunities = async () => {
  const url = 'http://localhost:8000/communities';
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};

const newCommunity = async (n, i, d) => {
  const data = {
    name: n,
    image: i || 'https://cdn.vox-cdn.com/thumbor/rUje72-KDI-XYKbKnvYxov-ueyQ=/0x0:1000x655/1400x1050/filters:focal(420x248:580x408):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/48671171/shutterstock_114033616.0.jpg',
    numMember: '1',
    description: d,
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = 'http://localhost:8000/communities';
  const res = await axios.post(
    url,
    data,
    options,
  );
  return res.data;
};

export { getCommunities, newCommunity };
