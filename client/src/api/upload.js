/* eslint-disable no-unused-vars */
import axios from 'axios';

const uploadFile = async (files) => {
  try {
    const res = await axios.post('http://localhost:8000/communities', files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    console.err(err.message);
  }
};

export default uploadFile;
