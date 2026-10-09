import { useCallback, useEffect, useMemo, useState } from "react";

import type { ReactNode } from "react";

import { login as loginRequest } from "../api/auth-api";
import {
  clearAccessToken,
  onSessionExpired,
  setAccessToken,
} from "../auth-token";
import { AuthContext } from "./auth-context";

import type { LoginRequest, User } from "../types/auth.types";

const IS_INITIALIZED = true;

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isInitialized = IS_INITIALIZED;

  const logout = useCallback(() => {
    clearAccessToken();
    setUser(null);
  }, []);

  const login = useCallback(async (input: LoginRequest) => {
    const response = await loginRequest(input);

    setAccessToken(response.data.accessToken);
    setUser(response.data.user);
  }, []);

  useEffect(() => {
    return onSessionExpired(() => {
      clearAccessToken();
      setUser(null);
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      isInitialized,
      login,
      logout,
    }),
    [user, isInitialized, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
