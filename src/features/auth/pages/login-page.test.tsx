import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "../context/auth-context";
import { LoginPage } from "./login-page";
import { MemoryRouter, Route, Routes } from "react-router-dom";

vi.mock("../context/auth-context", () => ({
  useAuth: vi.fn(),
}));

describe("LoginPage", () => {
  const mockLogin = vi.fn();
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

  it("redirects to the originally requested page after successful login", async () => {
    mockLogin.mockResolvedValue(undefined);

    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/login",
            state: { from: { pathname: "/accounts", search: "?page=2" } },
          },
        ]}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/accounts"
            element={<h1>Accounts destination reached</h1>}
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "admin@wealthwise.local" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "correct-password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Accounts destination reached",
        }),
      ).toBeInTheDocument();
    });
  });
});
