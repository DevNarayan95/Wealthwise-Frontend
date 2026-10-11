import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  archiveAccount,
  createAccount,
  getAccount,
  getAccountBalance,
  listAccounts,
} from "../api/accounts-api";
import {
  AccountStatus,
  AccountType,
  type AccountBalanceResponse,
  type AccountResponse,
  type CreateAccountRequest,
  type ListAccountsResponse,
} from "../types/accounts.types";
import { accountsQueryKeys } from "./accounts-query-keys";
import {
  useAccount,
  useAccountBalance,
  useAccounts,
  useArchiveAccount,
  useCreateAccount,
} from "./use-accounts";

vi.mock("../api/accounts-api", () => ({
  archiveAccount: vi.fn(),
  createAccount: vi.fn(),
  getAccount: vi.fn(),
  getAccountBalance: vi.fn(),
  listAccounts: vi.fn(),
}));

const account: AccountResponse = {
  success: true,
  data: {
    id: "account-123",
    name: "Maybank Savings",
    type: AccountType.BANK_ACCOUNT,
    currency: "MYR",
    openingBalance: "1250.5000",
    status: AccountStatus.ACTIVE,
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
  },
  meta: {},
};

const balance: AccountBalanceResponse = {
  success: true,
  data: {
    accountId: "account-123",
    currency: "MYR",
    balance: "1250.5000",
  },
  meta: {},
};

const accounts: ListAccountsResponse = {
  success: true,
  data: { items: [account.data] },
  meta: {
    page: 1,
    limit: 20,
    total: 1,
    totalPages: 1,
  },
};

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return QueryClientProvider({
      client: queryClient,
      children,
    });
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Accounts query hooks", () => {
  it("fetches accounts using the supplied pagination", async () => {
    vi.mocked(listAccounts).mockResolvedValueOnce(accounts);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useAccounts({ page: 1, limit: 20 }), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(accounts);
    expect(listAccounts).toHaveBeenCalledWith({ page: 1, limit: 20 });
  });

  it("fetches an account by ID", async () => {
    vi.mocked(getAccount).mockResolvedValueOnce(account);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useAccount("account-123"), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(account);
    expect(getAccount).toHaveBeenCalledWith("account-123");
  });

  it("does not fetch account details without an account ID", async () => {
    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useAccount(""), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(getAccount).not.toHaveBeenCalled();
  });

  it("fetches an account balance without changing decimal precision", async () => {
    vi.mocked(getAccountBalance).mockResolvedValueOnce(balance);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(() => useAccountBalance("account-123"), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.data.balance).toBe("1250.5000");
    expect(typeof result.current.data?.data.balance).toBe("string");
  });

  it("invalidates account lists after creating an account", async () => {
    const input: CreateAccountRequest = {
      name: "Maybank Savings",
      type: AccountType.BANK_ACCOUNT,
      currency: "MYR",
      openingBalance: "1250.5000",
    };

    vi.mocked(createAccount).mockResolvedValueOnce(account);

    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateAccount(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate(input);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(createAccount).toHaveBeenCalledWith(input);
    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: accountsQueryKeys.lists(),
    });
  });

  it("invalidates affected account caches after archiving an account", async () => {
    vi.mocked(archiveAccount).mockResolvedValueOnce({
      ...account,
      data: {
        ...account.data,
        status: AccountStatus.ARCHIVED,
      },
    });

    const queryClient = createTestQueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useArchiveAccount(), {
      wrapper: createWrapper(queryClient),
    });

    result.current.mutate("account-123");

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(archiveAccount).toHaveBeenCalledWith("account-123");

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: accountsQueryKeys.lists(),
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: accountsQueryKeys.detail("account-123"),
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: accountsQueryKeys.balance("account-123"),
    });
  });
});
