import axios from 'axios';

import { env } from '@/env';
import { initQueryClient } from '@ts-rest/react-query';
import { router } from '@tvrestaurant/contracts';

const baseUrl = env.appServerUrl;

export const defaultAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

defaultAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await defaultAxios.get(router.auth.refresh.path);
        if (response.status === 200) {
          return Promise.resolve(defaultAxios(originalRequest));
        }
      } catch (error) {
        location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export const apiClient = initQueryClient(router, {
  baseUrl,
  baseHeaders: {
    'Content-Type': 'application/json',
  },
  api: async ({ path, method, headers, body }) => {
    const result = await defaultAxios.request({
      url: path,
      method,
      headers,
      data: body,
    });
    return {
      status: result.status,
      body: result.data,
      headers: result.headers as any,
    };
  },
});
