import { afterEach, describe, expect, it, vi } from "vitest";

import { apiClient } from "../../../lib/api/api-client";
import {
  archiveAccount,
  createAccount,
  getAccount,
  getAccountBalance,
  listAccounts,
} from "./accounts-api";
import {
  AccountStatus,
  AccountType,
  type AccountBalanceResponse,
  type AccountResponse,
  type CreateAccountRequest,
  type ListAccountsResponse,
} from "../types/accounts.types";

vi.mock("../../../lib/api/api-client", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

const account = {
  id: "7d7c6f6e-9b13-4c68-a6b5-123456789abc",
  name: "Maybank Savings",
  type: AccountType.BANK_ACCOUNT,
  currency: "MYR",
  openingBalance: "1250.5000",
  status: AccountStatus.ACTIVE,
  createdAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-01T00:00:00.000Z",
};

const accountResponse: AccountResponse = {
  success: true,
  data: account,
  meta: {},
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("Accounts API", () => {
  it("lists accounts with default pagination", async () => {
    const result: ListAccountsResponse = {
      success: true,
      data: { items: [account] },
      meta: {
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      },
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: result });

    await expect(listAccounts()).resolves.toEqual(result);

    expect(apiClient.get).toHaveBeenCalledWith("/api/v1/accounts", {
      params: { page: 1, limit: 20 },
    });
  });

  it("lists accounts with the supplied pagination", async () => {
    const result: ListAccountsResponse = {
      success: true,
      data: { items: [account] },
      meta: {
        page: 2,
        limit: 10,
        total: 15,
        totalPages: 2,
      },
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: result });

    await expect(listAccounts({ page: 2, limit: 10 })).resolves.toEqual(result);

    expect(apiClient.get).toHaveBeenCalledWith("/api/v1/accounts", {
      params: { page: 2, limit: 10 },
    });
  });

  it("creates an account", async () => {
    const input: CreateAccountRequest = {
      name: "Maybank Savings",
      type: AccountType.BANK_ACCOUNT,
      currency: "MYR",
      openingBalance: "1250.5000",
    };

    vi.mocked(apiClient.post).mockResolvedValueOnce({
      data: accountResponse,
    });

    await expect(createAccount(input)).resolves.toEqual(accountResponse);

    expect(apiClient.post).toHaveBeenCalledWith("/api/v1/accounts", input);
  });

  it("gets an account by ID", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: accountResponse,
    });

    await expect(getAccount(account.id)).resolves.toEqual(accountResponse);

    expect(apiClient.get).toHaveBeenCalledWith(
      `/api/v1/accounts/${account.id}`,
    );
  });

  it("gets an account balance without converting its decimal string", async () => {
    const result: AccountBalanceResponse = {
      success: true,
      data: {
        accountId: account.id,
        currency: "MYR",
        balance: "1300.0000",
      },
      meta: {},
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: result });

    await expect(getAccountBalance(account.id)).resolves.toEqual(result);

    expect(apiClient.get).toHaveBeenCalledWith(
      `/api/v1/accounts/${account.id}/balance`,
    );

    expect(typeof result.data.balance).toBe("string");
    expect(result.data.balance).toBe("1300.0000");
  });

  it("archives an account using PATCH", async () => {
    const archivedResponse: AccountResponse = {
      success: true,
      data: {
        ...account,
        status: AccountStatus.ARCHIVED,
      },
      meta: {},
    };

    vi.mocked(apiClient.patch).mockResolvedValueOnce({
      data: archivedResponse,
    });

    await expect(archiveAccount(account.id)).resolves.toEqual(archivedResponse);

    expect(apiClient.patch).toHaveBeenCalledWith(
      `/api/v1/accounts/${account.id}/archive`,
    );
  });

  it("propagates API errors to the caller", async () => {
    const error = new Error("Network error");
    vi.mocked(apiClient.get).mockRejectedValueOnce(error);

    await expect(listAccounts()).rejects.toBe(error);
  });
});
