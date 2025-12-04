// src/api/authAPI.ts (hoặc file chứa api của bạn)
import { LoginCredentials, LoginResponse } from '../dto/login';
import { RegisterCredentials, RegisterResponse } from '../dto/register';
import axiosClient from "./axiosClients";
import { StreamChannelRequest, StreamChannelResponse, CreateStreamerChannelRequest, CreateStreamerChannelRespone } from '../dto/stream';
import { FllowRequest, FllowResponse } from '../dto/action';
import { UserComment, UserCommentRespone } from '../dto/cmt';

// --- 1. ĐỊNH NGHĨA INTERFACE (DTO) ---

// Interface dữ liệu gửi đi khi Update (Khớp với UpdateProfileRequest.java)
export interface UpdateProfileRequest {
  email: string;        // Dùng để định danh user
  fullName: string;     // Java: fullName
  dob?: string;         // Java: LocalDate (yyyy-MM-dd)
  gender?: string;      // Java: gender
  streamerName?: string; // Java: streamerName (tên kênh)
}

// Interface dữ liệu nhận về khi lấy Profile (Khớp với UserProfileResponse.java)
export interface UserProfileResponse {
  fullName: string;
  email: string;
  dob: string;
  gender: string;
  streamerName: string;
  streamKey: string;
}

// Interface phản hồi chung từ Server (Wrapper)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    return await axiosClient.post<LoginResponse>("/auth/login", credentials);
  },
  register: async (credentials: RegisterCredentials) => {
    return axiosClient.post<RegisterResponse>("/auth/register", credentials);
  }
};

export const filterCmt = {
  checkCmt: async (credentials: UserComment) => {
    return await axiosClient.post<UserCommentRespone>("/predict", credentials);
  }
}

export const streamApi = {
  getStreamChannel: async (credentials: StreamChannelRequest) => {
    return await axiosClient.get<StreamChannelResponse>("/streamers/channel", { params: credentials });
  },

  createStreamer: async (credentials: CreateStreamerChannelRequest) => {
    return await axiosClient.post<CreateStreamerChannelRespone>("/streamers/create", credentials);
  },

  // --- 2. THÊM 2 HÀM MỚI TẠI ĐÂY ---

  // GET /api/v1/streamers/me?email=...
  getMyProfile: async (email: string) => {
    // Lưu ý: params sẽ tự động chuyển thành ?email=value
    return await axiosClient.get<ApiResponse<UserProfileResponse>>("/streamers/me", { 
      params: { email } 
    });
  },

  // POST /api/v1/streamers/update
  updateProfile: async (data: UpdateProfileRequest) => {
    return await axiosClient.post<ApiResponse<any>>("/streamers/update", data);
  }
};

export const actionsApi = {
  like: async (postId: string) => {
    return await axiosClient.post(`/posts/${postId}/like`);
  },
  share: async (postId: string) => {
    return await axiosClient.post(`/posts/${postId}/share`);
  },
  follow: async (credentials: FllowRequest) => {
    return await axiosClient.post<FllowResponse>(`/user/actions/subscribe`, credentials);
  },
  unfollow: async (credentials: FllowRequest) => {
    return await axiosClient.delete<FllowResponse>(`/user/actions/unsubscribe`, { data: credentials });
  }
};