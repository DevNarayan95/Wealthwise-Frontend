import { apiClient } from "../../../lib/api/api-client";

import type { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(input: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>(
    "/api/v1/auth/login",
    input,
  );

  return response.data;
}
