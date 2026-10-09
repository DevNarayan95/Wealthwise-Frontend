import axios from "axios";

import { env } from "../../config/env";
import {
  expireAccessToken,
  getAccessToken,
} from "../../features/auth/auth-token";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  } else {
    config.headers.delete("Authorization");
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const requestUrl = error.config?.url?.replace(/^\/+/, "");

      if (requestUrl !== "api/v1/auth/login") {
        expireAccessToken();
      }
    }
    return Promise.reject(error);
  },
);
