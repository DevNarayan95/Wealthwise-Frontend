export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta: Record<string, unknown>;
}

export interface LoginData {
  accessToken: string;
  user: User;
}

export type LoginResponse = ApiSuccessResponse<LoginData>;

export type CurrentUserResponse = ApiSuccessResponse<User>;
