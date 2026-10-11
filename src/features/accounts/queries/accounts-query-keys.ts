import type { ListAccountsParams } from "../types/accounts.types";

export const accountsQueryKeys = {
  all: ["accounts"] as const,

  lists: () => [...accountsQueryKeys.all, "list"] as const,

  list: (params: ListAccountsParams = {}) =>
    [...accountsQueryKeys.lists(), params] as const,

  details: () => [...accountsQueryKeys.all, "detail"] as const,

  detail: (accountId: string) =>
    [...accountsQueryKeys.details(), accountId] as const,

  balance: (accountId: string) =>
    [...accountsQueryKeys.all, "balance", accountId] as const,
};
