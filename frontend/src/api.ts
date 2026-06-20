import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { Restaurant, RestaurantFormData } from './types';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await api(config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const msg = error.response.data?.message || 'An unexpected error occurred';
      throw new Error(msg);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server. Is the server running?');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export const restaurantApi = {
  getAll: (): Promise<{ status: string; results: number; data: Restaurant[] }> =>
    request({ url: '/restaurants', method: 'GET' }),

  getById: (id: string): Promise<{ status: string; data: Restaurant }> =>
    request({ url: `/restaurants/${id}`, method: 'GET' }),

  create: (data: RestaurantFormData): Promise<{ status: string; data: Restaurant }> =>
    request({
      url: '/restaurants',
      method: 'POST',
      data,
    }),

  update: (id: string, data: Partial<RestaurantFormData>): Promise<{ status: string; data: Restaurant }> =>
    request({
      url: `/restaurants/${id}`,
      method: 'PUT',
      data,
    }),

  delete: (id: string): Promise<void> =>
    request({ url: `/restaurants/${id}`, method: 'DELETE' }),
};
