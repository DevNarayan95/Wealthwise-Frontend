import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { login } from "../api/auth-api";
import {
  clearAccessToken,
  expireAccessToken,
  getAccessToken,
} from "../auth-token";
import type { LoginResponse } from "../types/auth.types";
import { AuthProvider } from "./auth-provider";
import { useAuth } from "./auth-context";

vi.mock("../api/auth-api", () => ({
  login: vi.fn(),
}));

const loginResponse: LoginResponse = {
  success: true,
  data: {
    accessToken: "test-access-token",
    user: {
      id: "test-user-id",
      email: "admin@wealthwise.local",
      firstName: "System",
      lastName: "Administrator",
      createdAt: "2026-08-06T10:00:00.000Z",
      updatedAt: "2026-08-06T10:00:00.000Z",
    },
  },
  meta: {},
};

function AuthConsumer() {
  const auth = useAuth();

  const handleLogin = async () => {
    try {
      await auth.login({
        email: "admin@wealthwise.local",
        password: "correct-password",
      });
    } catch {
      // The test observes the authentication state after failure.
    }
  };

  return (
    <div>
      <p data-testid="authentication-status">
        {auth.isAuthenticated ? "authenticated" : "anonymous"}
      </p>

      <p data-testid="current-user">{auth.user?.email ?? "no-user"}</p>

      <p data-testid="initialization-status">
        {auth.isInitialized ? "initialized" : "initializing"}
      </p>

      <button type="button" onClick={handleLogin}>
        Log in
      </button>

      <button type="button" onClick={auth.logout}>
        Log out
      </button>
    </div>
  );
}

function renderAuthConsumer() {
  return render(
    <AuthProvider>
      <AuthConsumer />
    </AuthProvider>,
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    clearAccessToken();
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
    clearAccessToken();
  });

  it("starts with an anonymous, initialized session", () => {
    renderAuthConsumer();

    expect(screen.getByTestId("authentication-status")).toHaveTextContent(
      "anonymous",
    );
    expect(screen.getByTestId("current-user")).toHaveTextContent("no-user");
    expect(screen.getByTestId("initialization-status")).toHaveTextContent(
      "initialized",
    );
    expect(getAccessToken()).toBeNull();
  });

  it("stores the token and user after successful login", async () => {
    vi.mocked(login).mockResolvedValue(loginResponse);

    renderAuthConsumer();

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(screen.getByTestId("authentication-status")).toHaveTextContent(
        "authenticated",
      );
    });

    expect(screen.getByTestId("current-user")).toHaveTextContent(
      "admin@wealthwise.local",
    );
    expect(getAccessToken()).toBe("test-access-token");
  });

  it("remains anonymous when login fails", async () => {
    vi.mocked(login).mockRejectedValue(new Error("Invalid credentials"));

    renderAuthConsumer();

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledOnce();
    });

    expect(screen.getByTestId("authentication-status")).toHaveTextContent(
      "anonymous",
    );
    expect(screen.getByTestId("current-user")).toHaveTextContent("no-user");
    expect(getAccessToken()).toBeNull();
  });

  it("clears the user and token on logout", async () => {
    vi.mocked(login).mockResolvedValue(loginResponse);

    renderAuthConsumer();

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(getAccessToken()).toBe("test-access-token");
    });

    fireEvent.click(screen.getByRole("button", { name: "Log out" }));

    expect(screen.getByTestId("authentication-status")).toHaveTextContent(
      "anonymous",
    );
    expect(screen.getByTestId("current-user")).toHaveTextContent("no-user");
    expect(getAccessToken()).toBeNull();
  });

  it("clears the authenticated state when the session expires", async () => {
    vi.mocked(login).mockResolvedValue(loginResponse);

    renderAuthConsumer();

    fireEvent.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => {
      expect(screen.getByTestId("authentication-status")).toHaveTextContent(
        "authenticated",
      );
    });

    expireAccessToken();

    await waitFor(() => {
      expect(screen.getByTestId("authentication-status")).toHaveTextContent(
        "anonymous",
      );
    });

    expect(screen.getByTestId("current-user")).toHaveTextContent("no-user");
    expect(getAccessToken()).toBeNull();
  });
});
