import { Link, useParams } from "react-router-dom";

import { useAccount, useAccountBalance } from "../queries/use-accounts";
import { AccountStatus, AccountType } from "../types/accounts.types";

const accountTypeLabels: Record<AccountType, string> = {
  [AccountType.BANK_ACCOUNT]: "Bank account",
  [AccountType.CASH]: "Cash",
  [AccountType.CREDIT_CARD]: "Credit card",
  [AccountType.INVESTMENT]: "Investment",
  [AccountType.OTHER]: "Other",
};

export function AccountDetailsPage() {
  const { accountId } = useParams<{ accountId: string }>();

  const accountQuery = useAccount(accountId ?? "");
  const balanceQuery = useAccountBalance(accountId ?? "");

  if (!accountId) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-bold">Account not found</h1>
        <p role="alert">The account ID is missing from the URL.</p>

        <Link to="/accounts" className="text-primary underline">
          Back to accounts
        </Link>
      </main>
    );
  }

  if (accountQuery.isPending) {
    return (
      <main>
        <p role="status">Loading account details...</p>
      </main>
    );
  }

  if (accountQuery.isError) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-bold">Unable to load account</h1>
        <p role="alert">
          Account details could not be loaded. The account may not exist, or the
          request may have failed.
        </p>

        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm"
          onClick={() => void accountQuery.refetch()}
        >
          Retry
        </button>

        <p>
          <Link to="/accounts" className="text-primary underline">
            Back to accounts
          </Link>
        </p>
      </main>
    );
  }

  const account = accountQuery.data.data;

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <Link to="/accounts" className="text-sm text-primary underline">
          ← Back to accounts
        </Link>

        <h1 className="mt-3 text-2xl font-bold">{account.name}</h1>

        <p className="mt-1 text-sm text-gray-600">
          Account details and current balance
        </p>
      </div>

      <section
        aria-labelledby="account-balance-heading"
        className="rounded-lg border bg-surface p-6"
      >
        <h2 id="account-balance-heading" className="text-sm text-gray-600">
          Current balance
        </h2>

        {balanceQuery.isPending ? (
          <p role="status" className="mt-2">
            Loading balance...
          </p>
        ) : balanceQuery.isError ? (
          <div className="mt-2 space-y-2">
            <p role="alert">Unable to load the current balance.</p>
            <button
              type="button"
              className="rounded-md border px-3 py-2 text-sm"
              onClick={() => void balanceQuery.refetch()}
            >
              Retry balance
            </button>
          </div>
        ) : (
          <p className="mt-2 font-mono text-3xl font-semibold">
            {balanceQuery.data.data.balance} {balanceQuery.data.data.currency}
          </p>
        )}
      </section>

      <section
        aria-labelled="account-information-heading"
        className="rounded-lg border p-6"
      >
        <h2 id="account-information-heading" className="text-lg font-semibold">
          Account information
        </h2>

        <dl className="mt-4 divide-y">
          <div className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-gray-600">Account name</dt>
            <dd className="font-medium">{account.name}</dd>
          </div>

          <div className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-gray-600">Account type</dt>
            <dd>{accountTypeLabels[account.type]}</dd>
          </div>

          <div className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-gray-600">Currency</dt>
            <dd>{account.currency}</dd>
          </div>

          <div className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-gray-600">Opening balance</dt>
            <dd className="font-mono">
              {account.openingBalance} {account.currency}
            </dd>
          </div>

          <div className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-gray-600">Status</dt>
            <dd>
              {account.status === AccountStatus.ACTIVE ? "Active" : "Archived"}
            </dd>
          </div>

          <div className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-gray-600">Created</dt>
            <dd>{new Date(account.createdAt).toLocaleString()}</dd>
          </div>

          <div className="flex flex-wrap justify-between gap-2 py-3">
            <dt className="text-sm text-gray-600">Last updated</dt>
            <dd>{new Date(account.updatedAt).toLocaleString()}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
