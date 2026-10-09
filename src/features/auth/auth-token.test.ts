import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearAccessToken,
  expireAccessToken,
  getAccessToken,
  onSessionExpired,
  setAccessToken,
} from "./auth-token";

describe("auth-token", () => {
  let unsubscribe: (() => void) | undefined;

  beforeEach(() => {
    clearAccessToken();
    unsubscribe = undefined;
  });

  afterEach(() => {
    unsubscribe?.();
    clearAccessToken();
    vi.restoreAllMocks();
  });

  it("returns null when no access token is stored", () => {
    expect(getAccessToken()).toBeNull();
  });

  it("stores and returns an access token", () => {
    setAccessToken("test-access-token");

    expect(getAccessToken()).toBe("test-access-token");
  });

  it("clears the access token", () => {
    setAccessToken("test-access-token");

    clearAccessToken();

    expect(getAccessToken()).toBeNull();
  });

  it("clears the token and notifies listeners when the session expires", () => {
    const listener = vi.fn();
    unsubscribe = onSessionExpired(listener);
    setAccessToken("test-access-token");

    expireAccessToken();

    expect(getAccessToken()).toBeNull();
    expect(listener).toHaveBeenCalledOnce();
  });

  it("does not notify listeners when no token exists", () => {
    const listener = vi.fn();
    unsubscribe = onSessionExpired(listener);

    expireAccessToken();

    expect(getAccessToken()).toBeNull();
    expect(listener).not.toHaveBeenCalled();
  });

  it("stops notifying a listener after it unsubscribes", () => {
    const listener = vi.fn();
    unsubscribe = onSessionExpired(listener);
    setAccessToken("test-access-token");

    unsubscribe();
    unsubscribe = undefined;

    expireAccessToken();

    expect(listener).not.toHaveBeenCalled();
  });
});
