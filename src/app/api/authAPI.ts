
// src/api/login.ts
import { LoginCredentials, LoginResponse } from '../dto/login';
import { RegisterCredentials, RegisterResponse } from '../dto/register';
import axiosClient from "./axiosClients";
import { StreamChannelRequest , StreamChannelResponse, CreateStreamerChannelRequest, CreateStreamerChannelRespone } from '../dto/stream';
import { FllowRequest, FllowResponse } from '../dto/action';

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
  // Lấy thông tin StreamChannel (nếu có endpoint GET /streamers/channel)
  getStreamChannel: async (credentials: StreamChannelRequest) => {
    return await axiosClient.get<StreamChannelResponse>("/streamers/channel", { params: credentials });
  },

  // Tạo Streamer mới
  createStreamer: async (credentials: CreateStreamerChannelRequest) => {
    return await axiosClient.post<CreateStreamerChannelRespone>("/streamers/create", credentials);
  },



};  export const actionsApi = {

  like: async (postId: string) => {
    return await axiosClient.post(`/posts/${postId}/like`);
  },

  share: async (postId: string) => {
    return await axiosClient.post(`/posts/${postId}/share`);
  },

  follow: async (credentials: FllowRequest) => {
    return await axiosClient.post<FllowResponse>(`/user/actions/subscribe`, credentials);
  }

};