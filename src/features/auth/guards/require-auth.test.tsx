import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuth } from "../context/auth-context";
import { RequireAuth } from "./require-auth";

vi.mock("../context/auth-context", () => ({
  useAuth: vi.fn(),
}));

function LoginTestPage() {
  const location = useLocation();
  const state = location.state as { from?: { pathname?: string } } | null;

  return (
    <div>
      <h1>Login test page</h1>
      <p data-testid="redirect-destination">
        {state?.from?.pathname ?? "no destination"}
      </p>
    </div>
  );
}

function renderProtectedRoute(initialEntry = "/accounts") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<LoginTestPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/accounts" element={<h1>Protected accounts page</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("RequireAuth", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("redirects anonymous users to login and preserves the destination", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderProtectedRoute();

    expect(
      screen.getByRole("heading", { name: "Login test page" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("redirect-destination")).toHaveTextContent(
      "/accounts",
    );

    expect(
      screen.queryByRole("heading", { name: "Protected accounts page" }),
    ).not.toBeInTheDocument();
  });

  it("renders the protected page for authenticated users", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        id: "test-user-id",
        email: "admin@wealthwise.local",
        firstName: "System",
        lastName: "Administrator",
        createdAt: "2026-08-06T10:00:00.000Z",
        updatedAt: "2026-08-06T10:00:00.000Z",
      },
      isAuthenticated: true,
      isInitialized: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderProtectedRoute();

    expect(
      screen.getByRole("heading", { name: "Protected accounts page" }),
    ).toBeInTheDocument();
  });
});
