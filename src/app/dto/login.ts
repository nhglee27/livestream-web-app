
//  DTO for login request
export interface LoginCredentials {
  email: string;
  password: string;
}


// DTO for login response
export interface LoginResponse {
  token: string;
    name: string;
    email: string;
}