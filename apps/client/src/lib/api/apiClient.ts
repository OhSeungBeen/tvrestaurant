import axios from 'axios';

import { env } from '@/env';
import { initQueryClient } from '@ts-rest/react-query';
import { router } from '@tvrestaurant/contracts';

const baseUrl = env.appServerUrl;

export const defaultAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

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
