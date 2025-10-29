// src/api/login.ts
import { LoginCredentials, LoginResponse } from '../dto/login';
import axiosClient from "./axiosClients";


// const api = axios.create({
//   baseURL: process.env.VITE_API_URL || 'http://localhost:8080/api/v1',
//   timeout: 8000,
// });

// const login = async (creds: LoginCredentials): Promise<LoginResponse> => {
//   const { data } = await api.post<LoginResponse>('/auth/login', creds);
  
//   return data;
// };






export const authApi = {

  // 
  login: async (credentials: LoginCredentials) => {
    return await axiosClient.post<Promise<LoginResponse>>("/auth/login", credentials);
  },

  register: (email: string, password: string, fullName: string) => {
    return axiosClient.post("/auth/register", { email, password, fullName });
  },

  getProfile: () => {
    return axiosClient.get("/auth/profile");
  },
};