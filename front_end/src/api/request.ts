/**
 * 请求基础模块负责创建全局 Axios 实例。
 * 它统一配置 API 基础路径、请求超时时间、请求拦截器和响应拦截器。
 * 当前 baseURL 默认指向 /api，并可通过 VITE_API_BASE_URL 在不同环境中覆盖。
 * 响应拦截器会返回 response.data，因此上层业务 API 可以直接拿到后端数据主体。
 * 后续加入登录鉴权后，可以在请求拦截器里统一注入 Token，并在响应拦截器里处理未授权错误。
 */
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
