import axios from 'axios';

const setHeaders = () => {
  axios.defaults.headers.common.Authorization = sessionStorage.getItem('sessionId');
};

export default setHeaders;
