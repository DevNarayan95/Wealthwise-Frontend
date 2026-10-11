import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  archiveAccount,
  createAccount,
  getAccount,
  getAccountBalance,
  listAccounts,
} from "../api/accounts-api";

import type {
  CreateAccountRequest,
  ListAccountsParams,
} from "../types/accounts.types";

import { accountsQueryKeys } from "./accounts-query-keys";

export function useAccounts(params: ListAccountsParams = {}) {
  return useQuery({
    queryKey: accountsQueryKeys.list(params),
    queryFn: () => listAccounts(params),
  });
}

export function useAccount(accountId: string) {
  return useQuery({
    queryKey: accountsQueryKeys.detail(accountId),
    queryFn: () => getAccount(accountId),
    enabled: accountId.length > 0,
  });
}

export function useAccountBalance(accountId: string) {
  return useQuery({
    queryKey: accountsQueryKeys.balance(accountId),
    queryFn: () => getAccountBalance(accountId),
    enabled: accountId.length > 0,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateAccountRequest) => createAccount(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: accountsQueryKeys.lists(),
      });
    },
  });
}

export function useArchiveAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (accountId: string) => archiveAccount(accountId),
    onSuccess: async (_response, accountId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: accountsQueryKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: accountsQueryKeys.detail(accountId),
        }),
        queryClient.invalidateQueries({
          queryKey: accountsQueryKeys.balance(accountId),
        }),
      ]);
    },
  });
}
