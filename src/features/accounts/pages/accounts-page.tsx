import { AccountsList } from "../components/accounts-list";
import { CreateAccountForm } from "../components/create-account-form";

export function AccountsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your financial accounts and track their balances.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <section aria-labelledby="accounts-list-heading">
          <AccountsList />
        </section>

        <aside aria-label="Create a new account">
          <CreateAccountForm />
        </aside>
      </div>
    </main>
  );
}
