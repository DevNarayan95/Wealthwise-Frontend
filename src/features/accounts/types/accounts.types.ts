import type { ApiSuccessResponse } from "../../../lib/api/api.types";

export const AccountType = {
  BANK_ACCOUNT: "BANK_ACCOUNT",
  CASH: "CASH",
  CREDIT_CARD: "CREDIT_CARD",
  INVESTMENT: "INVESTMENT",
  OTHER: "OTHER",
} as const;
export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const AccountStatus = {
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  currency: string;
  openingBalance: string;
  status: AccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountRequest {
  name: string;
  type: AccountType;
  currency: string;
  openingBalance: string;
}

export interface AccountBalance {
  accountId: string;
  currency: string;
  balance: string;
}

export interface ListAccountsParams {
  page?: number;
  limit?: number;
}

export interface PaginatedAccountsData {
  items: Account[];
}

export interface AccountsPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type AccountResponse = ApiSuccessResponse<Account>;

export type AccountBalanceResponse = ApiSuccessResponse<AccountBalance>;

export type ListAccountsResponse = ApiSuccessResponse<PaginatedAccountsData> & {
  meta: AccountsPaginationMeta;
};
