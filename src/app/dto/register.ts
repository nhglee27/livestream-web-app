export interface RegisterCredentials{
    email: string;
    password: string;
    fullName: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    fullName: string;
  };
}