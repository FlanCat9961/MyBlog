import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    // 可以添加 Token 等头信息
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    // 如果后端统一了一层返回结构例如 { code:200, data:... } 可以做解构
    return response.data;
  },
  (error) => {
    // 统一处理报错通知
    console.error('Request Error: ', error);
    return Promise.reject(error);
  }
);

export default request;
