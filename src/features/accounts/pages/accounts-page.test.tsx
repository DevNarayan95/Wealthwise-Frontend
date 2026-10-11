import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AccountsPage } from "./accounts-page";

vi.mock("../components/accounts-list", () => ({
  AccountsList: () => <div data-testid="accounts-list" />,
}));

vi.mock("../components/create-account-form", () => ({
  CreateAccountForm: () => <div data-testid="create-account-form" />,
}));

describe("AccountsPage", () => {
  it("renders the page heading and description", () => {
    render(<AccountsPage />);

    expect(
      screen.getByRole("heading", { name: "Accounts" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Manage your financial accounts and track their balances.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the accounts list", () => {
    render(<AccountsPage />);

    expect(screen.getByTestId("accounts-list")).toBeInTheDocument();
  });

  it("renders the create-account form", () => {
    render(<AccountsPage />);

    expect(screen.getByTestId("create-account-form")).toBeInTheDocument();
  });
});
