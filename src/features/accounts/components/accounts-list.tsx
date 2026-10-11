import { useState } from "react";
import { Link } from "react-router-dom";

import { useAccounts } from "../queries/use-accounts";
import { AccountStatus, AccountType } from "../types/accounts.types";

const PAGE_SIZE = 20;

const accountTypeLabels: Record<AccountType, string> = {
  [AccountType.BANK_ACCOUNT]: "Bank account",
  [AccountType.CASH]: "Cash",
  [AccountType.CREDIT_CARD]: "Credit card",
  [AccountType.INVESTMENT]: "Investment",
  [AccountType.OTHER]: "Other",
};

function formatAccountType(type: AccountType): string {
  return accountTypeLabels[type];
}

export function AccountsList() {
  const [page, setPage] = useState(1);

  const accountsQuery = useAccounts({
    page,
    limit: PAGE_SIZE,
  });

  if (accountsQuery.isPending) {
    return (
      <section aria-label="Accounts">
        <p role="status">Loading accounts...</p>
      </section>
    );
  }

  if (accountsQuery.isError) {
    return (
      <section aria-label="Accounts">
        <h2>Accounts</h2>
        <p role="alert">Unable to load accounts. Please try again.</p>

        <button type="submit" onClick={() => void accountsQuery.refetch()}>
          Retry
        </button>
      </section>
    );
  }

  const response = accountsQuery.data;
  const accounts = response.data.items;
  const pagination = response.meta;

  const hasPreviousPage = page > 1;
  const hasNextPage = page < pagination.totalPages;
  const isFetching = accountsQuery.isFetching;

  return (
    <section aria-label="Accounts" className="space-y-4">
      {accounts.length === 0 ? (
        <div className="rounded-lg border p-6">
          <h3 className="font-medium">No accounts found</h3>
          <p className="mt-1 text-sm text-gray-600">
            Create an account to start tracking your finances.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Account
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Opening balance
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-4 py-3">
                      {" "}
                      <Link
                        to={`/accounts/${encodeURIComponent(account.id)}`}
                        className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`View account ${account.name}`}
                      >
                        {" "}
                        {account.name}{" "}
                      </Link>{" "}
                      <span className="mt-1 block text-xs text-gray-500">
                        {" "}
                        {account.currency}{" "}
                      </span>{" "}
                    </td>

                    <td className="px-4 py-3">
                      {formatAccountType(account.type)}
                    </td>

                    <td className="px-4 py-3 font-mono">
                      {account.openingBalance} {account.currency}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={
                          account.status === AccountStatus.ACTIVE
                            ? "rounded-full bg-green-100 px-2 py-1 text-xs text-green-800"
                            : "rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                        }
                      >
                        {account.status === AccountStatus.ACTIVE
                          ? "Active"
                          : "Archived"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages} .{" "}
              {pagination.total} account
              {pagination.total === 1 ? "" : "s"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasPreviousPage || isFetching}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <button
              type="button"
              className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!hasNextPage || isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
