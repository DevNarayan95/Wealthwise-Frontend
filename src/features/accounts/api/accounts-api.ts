import { apiClient } from "../../../lib/api/api-client";
import type {
  AccountBalanceResponse,
  AccountResponse,
  CreateAccountRequest,
  ListAccountsParams,
  ListAccountsResponse,
} from "../types/accounts.types";

export async function listAccounts(
  params: ListAccountsParams = {},
): Promise<ListAccountsResponse> {
  const response = await apiClient.get<ListAccountsResponse>(
    "/api/v1/accounts",
    {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
      },
    },
  );

  return response.data;
}

export async function createAccount(
  input: CreateAccountRequest,
): Promise<AccountResponse> {
  const response = await apiClient.post<AccountResponse>(
    "/api/v1/accounts",
    input,
  );

  return response.data;
}

export async function getAccount(accountId: string): Promise<AccountResponse> {
  const response = await apiClient.get<AccountResponse>(
    `/api/v1/accounts/${encodeURIComponent(accountId)}`,
  );

  return response.data;
}

export async function getAccountBalance(
  accountId: string,
): Promise<AccountBalanceResponse> {
  const response = await apiClient.get<AccountBalanceResponse>(
    `/api/v1/accounts/${encodeURIComponent(accountId)}/balance`,
  );

  return response.data;
}

export async function archiveAccount(
  accountId: string,
): Promise<AccountResponse> {
  const response = await apiClient.patch<AccountResponse>(
    `/api/v1/accounts/${encodeURIComponent(accountId)}/archive`,
  );

  return response.data;
}
