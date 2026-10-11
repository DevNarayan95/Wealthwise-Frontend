import type { ApiSuccessResponse } from "../../../lib/api/api.types";

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

export interface LoginData {
  accessToken: string;
  user: User;
}

export type LoginResponse = ApiSuccessResponse<LoginData>;

export type CurrentUserResponse = ApiSuccessResponse<User>;
