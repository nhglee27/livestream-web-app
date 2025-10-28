// src/api/login.ts
import axios from 'axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 8000,
});

const login = async (creds: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/auth/login', creds);
  return data;
};
