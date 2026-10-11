import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccountDetailsPage } from "./account-details-page";
import { AccountStatus, AccountType } from "../types/accounts.types";
const { useAccountMock, useAccountBalanceMock } = vi.hoisted(() => ({
  useAccountMock: vi.fn(),
  useAccountBalanceMock: vi.fn(),
}));
vi.mock("../queries/use-accounts", () => ({
  useAccount: useAccountMock,
  useAccountBalance: useAccountBalanceMock,
}));
const account = {
  id: "account-123",
  name: "Maybank Savings",
  type: AccountType.BANK_ACCOUNT,
  currency: "MYR",
  openingBalance: "1250.5000",
  status: AccountStatus.ACTIVE,
  createdAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-02T00:00:00.000Z",
};
const balance = {
  accountId: "account-123",
  currency: "MYR",
  balance: "1325.7500",
};
function renderAccountDetails(path = "/accounts/account-123") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      {" "}
      <Routes>
        {" "}
        <Route
          path="/accounts/:accountId"
          element={<AccountDetailsPage />}
        />{" "}
        <Route path="/accounts" element={<AccountDetailsPage />} />{" "}
      </Routes>{" "}
    </MemoryRouter>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  useAccountMock.mockReturnValue({
    data: { success: true, data: account },
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  });
  useAccountBalanceMock.mockReturnValue({
    data: { success: true, data: balance },
    isPending: false,
    isError: false,
    refetch: vi.fn(),
  });
});
describe("AccountDetailsPage", () => {
  it("shows a loading state while account details are loading", () => {
    useAccountMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      refetch: vi.fn(),
    });
    renderAccountDetails();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading account details...",
    );
  });
  it("shows an error when account details cannot be loaded", () => {
    useAccountMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch: vi.fn(),
    });
    renderAccountDetails();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Account details could not be loaded.",
    );
    expect(
      screen.getByRole("link", { name: /back to accounts/i }),
    ).toBeInTheDocument();
  });
  it("renders account details and balance without changing decimal precision", () => {
    renderAccountDetails();
    expect(
      screen.getByRole("heading", { name: "Maybank Savings" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Bank account")).toBeInTheDocument();
    expect(screen.getByText("1250.5000 MYR")).toBeInTheDocument();
    expect(screen.getByText("1325.7500 MYR")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
  it("shows a loading state while the balance is loading", () => {
    useAccountBalanceMock.mockReturnValue({
      data: undefined,
      isPending: true,
      isError: false,
      refetch: vi.fn(),
    });
    renderAccountDetails();
    expect(screen.getByRole("status")).toHaveTextContent("Loading balance...");
    expect(
      screen.getByRole("heading", { name: "Maybank Savings" }),
    ).toBeInTheDocument();
  });
  it("shows a balance error without hiding account details", () => {
    useAccountBalanceMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch: vi.fn(),
    });
    renderAccountDetails();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unable to load the current balance.",
    );
    expect(
      screen.getByRole("heading", { name: "Maybank Savings" }),
    ).toBeInTheDocument();
  });
  it("retries loading the balance when Retry balance is clicked", () => {
    const refetch = vi.fn();
    useAccountBalanceMock.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch,
    });
    renderAccountDetails();
    fireEvent.click(screen.getByRole("button", { name: "Retry balance" }));
    expect(refetch).toHaveBeenCalledOnce();
  });
  it("shows a missing-ID message when the route has no account ID", () => {
    renderAccountDetails("/accounts");
    expect(
      screen.getByRole("heading", { name: "Account not found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "The account ID is missing from the URL.",
    );
  });
});
