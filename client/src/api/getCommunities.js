/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

const getCommunities = async () => {
  const url = 'http://localhost:8000/communities';
  const res = await axios.get(url);
  return res.data;
};

const newCommunity = async (name, description) => {
  const data = {
    name,
    image: 'https://cdn.vox-cdn.com/thumbor/rUje72-KDI-XYKbKnvYxov-ueyQ=/0x0:1000x655/1400x1050/filters:focal(420x248:580x408):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/48671171/shutterstock_114033616.0.jpg',
    numMember: '1',
    description,
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
