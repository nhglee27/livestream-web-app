
//  DTO for login request
export interface LoginCredentials {
  email: string;
  password: string;
}





// DTO for login response
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    email: string;
    name: string;
  };
}