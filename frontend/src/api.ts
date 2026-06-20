import type { Restaurant, RestaurantFormData } from './types';

const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  let json: any = null;
  if (res.status !== 204) {
    const text = await res.text();
    if (text) {
      try {
        json = JSON.parse(text);
      } catch (err) {
        if (!res.ok) {
          throw new Error(text || 'An unexpected error occurred');
        }
        throw err;
      }
    }
  }

  if (!res.ok) {
    const msg = json?.message || 'An unexpected error occurred';
    throw new Error(msg);
  }

  return json;
}

export const restaurantApi = {
  getAll: (): Promise<{ status: string; results: number; data: Restaurant[] }> =>
    request('/restaurants'),

  getById: (id: string): Promise<{ status: string; data: Restaurant }> =>
    request(`/restaurants/${id}`),

  create: (data: RestaurantFormData): Promise<{ status: string; data: Restaurant }> =>
    request('/restaurants', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<RestaurantFormData>): Promise<{ status: string; data: Restaurant }> =>
    request(`/restaurants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string): Promise<void> =>
    request(`/restaurants/${id}`, { method: 'DELETE' }),
};
