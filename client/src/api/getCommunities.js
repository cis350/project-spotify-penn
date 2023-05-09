/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';

import setHeaders from './setHeaders';

const getCommunities = async () => {
  setHeaders();
  const url = 'http://localhost:8000/communities';
  const res = await axios.get(url);
  console.log(res.data);
  return res.data;
};

const newCommunity = async (n, i, d) => {
  setHeaders();
  const data = {
    name: n,
    image: i || 'https://cdn.vox-cdn.com/thumbor/rUje72-KDI-XYKbKnvYxov-ueyQ=/0x0:1000x655/1400x1050/filters:focal(420x248:580x408):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/48671171/shutterstock_114033616.0.jpg',
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

const toggleJoin = async (item) => {
  setHeaders();
  const res = await axios.get(`http://localhost:8000/communities/members/${item._id}`);
  return res.data;
};

export { getCommunities, newCommunity, toggleJoin };
