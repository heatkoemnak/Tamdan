import axios from 'axios';

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // ✅ Backend production URL
  withCredentials: true, // ✅ Ensures cookies are sent and received
});

export default Api;
