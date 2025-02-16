import axios from 'axios';

const Api = axios.create({
  baseURL: `https://tamdan-server.vercel.app`, // ✅ Backend production URL
  withCredentials: true, // ✅ Ensures cookies are sent and received
});

export default Api;
