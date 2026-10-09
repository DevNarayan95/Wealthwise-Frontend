let accessToken: string | null = null;

const sessionExpiredListeners = new Set<() => void>();

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}

export function expireAccessToken(): void {
  const hadAccessToken = accessToken !== null;

  accessToken = null;

  if (hadAccessToken) {
    sessionExpiredListeners.forEach((listener) => listener());
  }
}

export function onSessionExpired(listener: () => void): () => void {
  sessionExpiredListeners.add(listener);

  return () => {
    sessionExpiredListeners.delete(listener);
  };
}
