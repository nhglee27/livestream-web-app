
// src/api/login.ts
import { LoginCredentials, LoginResponse } from '../dto/login';
import { RegisterCredentials, RegisterResponse } from '../dto/register';
import axiosClient from "./axiosClients";
import { StreamChannelRequest , StreamChannelResponse } from '../dto/stream';

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
    return await axiosClient.post<LoginResponse>("/auth/login", credentials);
  },

  register: async (credentials: RegisterCredentials) => {
    return axiosClient.post<RegisterResponse>("/auth/register", credentials);
  }

};



export const streamApi = {
  // get StreamChannel
  getStreamChannel: async (credentials : StreamChannelRequest) => {
    return await axiosClient.get<StreamChannelResponse>("/streamers/channel", { params: credentials });
  },
};