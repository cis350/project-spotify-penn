/* eslint-disable no-underscore-dangle */

import axios from 'axios';

const getMessages = async (socket) => {
  const url = `http://localhost:8000/sockets/${socket}`;
  const res = await axios.get(url);
  const messages = res.data;
  return messages;
};

const updateMessages = async (socket, newMessages) => {
  const data = {
    id: socket,
    messages: newMessages,
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `http://localhost:8000/sockets/${socket}`;
  const res = await axios.put(
    url,
    data,
    options,
  );
  return res.data;
};

const newConversation = async (socket) => {
  const data = {
    _id: socket,
    messages: [],
  };
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = 'http://localhost:8000/sockets';
  const res = await axios.post(
    url,
    data,
    options,
  ).catch((err) => {
    console.error(err);
  });
  return res.data;
};

const getSockets = async () => {
  const url = 'http://localhost:8000/sockets';
  let sockets = [];
  try {
    const res = await axios.get(url);
    sockets = res.data.map((socket) => socket._id);
  } catch (error) {
    // do nothing
  }
  return sockets;
};

export {
  getSockets, getMessages, updateMessages, newConversation,
};
