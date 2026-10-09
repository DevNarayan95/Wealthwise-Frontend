import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "../context/auth-context";
import type { LoginRequest } from "../types/auth.types";
import { LoginForm } from "./login-form";

vi.mock("../context/auth-context", () => ({
  useAuth: vi.fn(),
}));

describe("LoginForm", () => {
  const mockLogin = vi.fn<(input: LoginRequest) => Promise<void>>();
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
      login: mockLogin,
      logout: mockLogout,
    });
  });

  it("displays validation errors for empty fields", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(
      await screen.findByText("Enter a valid email address."),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Password must be at least 8 characters."),
    ).toBeInTheDocument();

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("submits normalized email and password on success", async () => {
    mockLogin.mockResolvedValue(undefined);
    const onSuccess = vi.fn();

    render(<LoginForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "  ADMIN@WEALTHWISE.LOCAL  " },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "correct-password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "admin@wealthwise.local",
        password: "correct-password",
      });
    });

    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it("displays a safe error when login fails", async () => {
    mockLogin.mockRejectedValue(new Error("Internal server details"));

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "admin@wealthwise.local" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "correct-password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to sign in right now. Please try again.",
    );

    expect(
      screen.queryByText("Internal server details"),
    ).not.toBeInTheDocument();
  });
});
