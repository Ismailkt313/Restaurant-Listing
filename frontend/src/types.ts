export interface Restaurant {
  id: string;
  name: string;
  address: string;
  contact_number: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RestaurantFormData {
  name: string;
  address: string;
  contact_number: string;
  email: string;
}

export type FormMode = 'create' | 'edit';

export interface ApiResponse<T> {
  status: string;
  data?: T;
  results?: number;
  message?: string;
}

export interface ValidationErrors {
  name?: string;
  address?: string;
  contact_number?: string;
  email?: string;
}
