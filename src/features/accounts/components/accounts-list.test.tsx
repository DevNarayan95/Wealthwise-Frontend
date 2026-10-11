import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AccountsList } from "./accounts-list";
import { AccountStatus, AccountType } from "../types/accounts.types";

import { MemoryRouter } from "react-router-dom";

const { useAccountsMock } = vi.hoisted(() => ({
  useAccountsMock: vi.fn(),
}));

vi.mock("../queries/use-accounts", () => ({
  useAccounts: useAccountsMock,
}));

const account = {
  id: "account-123",
  name: "Maybank Savings",
  type: AccountType.BANK_ACCOUNT,
  currency: "MYR",
  openingBalance: "1250.5000",
  status: AccountStatus.ACTIVE,
  createdAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-01T00:00:00.000Z",
};

const defaultPagination = {
  page: 1,
  limit: 20,
  total: 1,
  totalPages: 1,
};

function createQueryResult(overrides: Record<string, unknown> = {}) {
  return {
    data: {
      success: true as const,
      data: { items: [account] },
      meta: defaultPagination,
    },
    isPending: false,
    isError: false,
    isFetching: false,
    refetch: vi.fn(),
    ...overrides,
  };
}

function renderAccountsList() {
  return render(
    <MemoryRouter>
      <AccountsList />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.resetAllMocks();
});

describe("AccountsList", () => {
  it("shows a loading state while accounts are loading", () => {
    useAccountsMock.mockReturnValue(
      createQueryResult({
        data: undefined,
        isPending: true,
      }),
    );

    renderAccountsList();

    expect(screen.getByRole("status")).toHaveTextContent("Loading accounts...");
  });

  it("shows an error and allows retrying the request", async () => {
    const refetch = vi.fn();

    useAccountsMock.mockReturnValue(
      createQueryResult({
        data: undefined,
        isError: true,
        refetch,
      }),
    );

    renderAccountsList();

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Unable to load accounts. Please try again.",
    );

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));

    await waitFor(() => {
      expect(refetch).toHaveBeenCalledOnce();
    });
  });

  it("displays an empty state when no accounts exist", () => {
    useAccountsMock.mockReturnValue(
      createQueryResult({
        data: {
          success: true,
          data: { items: [] },
          meta: {
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0,
          },
        },
      }),
    );

    renderAccountsList();

    expect(screen.getByText("No accounts found")).toBeTruthy();
    expect(
      screen.getByText("Create an account to start tracking your finances."),
    ).toBeTruthy();
  });

  it("displays account details without changing decimal precision", () => {
    useAccountsMock.mockReturnValue(createQueryResult());

    renderAccountsList();

    expect(screen.getByText("Maybank Savings")).toBeTruthy();
    expect(screen.getByText("Bank account")).toBeTruthy();
    expect(screen.getByText("1250.5000 MYR")).toBeTruthy();
    expect(screen.getByText("Active")).toBeTruthy();
  });

  it("disables pagination when there is only one page", () => {
    useAccountsMock.mockReturnValue(createQueryResult());

    renderAccountsList();

    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("requests the next page when Next is clicked", () => {
    useAccountsMock.mockReturnValue(
      createQueryResult({
        data: {
          success: true,
          data: { items: [account] },
          meta: {
            page: 1,
            limit: 20,
            total: 25,
            totalPages: 2,
          },
        },
      }),
    );

    renderAccountsList();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    expect(useAccountsMock).toHaveBeenLastCalledWith({
      page: 2,
      limit: 20,
    });
  });

  it("displays archived account status", () => {
    useAccountsMock.mockReturnValue(
      createQueryResult({
        data: {
          success: true,
          data: {
            items: [{ ...account, status: AccountStatus.ARCHIVED }],
          },
          meta: defaultPagination,
        },
      }),
    );

    renderAccountsList();

    expect(screen.getByText("Archived")).toBeTruthy();
  });
});
