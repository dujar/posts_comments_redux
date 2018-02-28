import axios from 'axios'



const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Authorization': 'something is up!'
  }
});

export default axiosInstance;