import axios from 'axios';

const uploadFile = async (files) => {
  try {
    const res = await axios.post('http://localhost:8000/communities', files, { // use a global variable
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(`Upload sucessful ${res}`);
  } catch (err) {
    console.err(err.message);
  }
};

export default uploadFile;
