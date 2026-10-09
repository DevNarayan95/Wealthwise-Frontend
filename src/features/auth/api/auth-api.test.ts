import type { AxiosResponse } from "axios";

import { apiClient } from "../../../lib/api/api-client";
import { login } from "./auth-api";

import type { LoginRequest, LoginResponse } from "../types/auth.types";

describe("login", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends the credentials to the login endpoint and returns the response body", async () => {
    const input: LoginRequest = {
      email: "admin@wealthwise.local",
      password: "SecurePassword123!",
    };

    const expectedResponse: LoginResponse = {
      success: true,
      data: {
        accessToken: "test-access-token",
        user: {
          id: "7f5d9c7e-6f1c-4e2b-8a3e-123456789abc",
          email: "admin@wealthwise.local",
          firstName: "System",
          lastName: "Administrator",
          createdAt: "2026-08-06T10:00:00.000Z",
          updatedAt: "2026-08-06T10:00:00.000Z",
        },
      },
      meta: {},
    };

    const postSpy = vi.spyOn(apiClient, "post").mockResolvedValueOnce({
      data: expectedResponse,
    } as AxiosResponse<LoginResponse>);

    const result = await login(input);

    expect(postSpy).toHaveBeenCalledWith("/api/v1/auth/login", input);
    expect(result).toEqual(expectedResponse);
  });
});
