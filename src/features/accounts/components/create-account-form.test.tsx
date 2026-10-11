import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CreateAccountForm } from "./create-account-form";
import { AccountStatus, AccountType } from "../types/accounts.types";

const { mutateAsyncMock } = vi.hoisted(() => ({
  mutateAsyncMock: vi.fn(),
}));

vi.mock("../queries/use-accounts", () => ({
  useCreateAccount: () => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
  }),
}));

const createdAccount = {
  id: "account-123",
  name: "Maybank Savings",
  type: AccountType.BANK_ACCOUNT,
  currency: "MYR",
  openingBalance: "1250.5000",
  status: AccountStatus.ACTIVE,
  createdAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-01T00:00:00.000Z",
};

const accountResponse = {
  success: true as const,
  data: createdAccount,
  meta: {},
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("CreateAccountForm", () => {
  it("displays validation errors when the account name is empty", async () => {
    render(<CreateAccountForm />);

    fireEvent.change(screen.getByLabelText(/account name/i), {
      target: { value: "   " },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText("Account name is required.")).toBeTruthy();

    expect(mutateAsyncMock).not.toHaveBeenCalled();
  });

  it("submits valid data and notifies the parent on success", async () => {
    mutateAsyncMock.mockResolvedValueOnce(accountResponse);

    const onCreated = vi.fn();

    render(<CreateAccountForm onCreated={onCreated} />);

    fireEvent.change(screen.getByLabelText(/account name/i), {
      target: { value: "Maybank Savings" },
    });

    fireEvent.change(screen.getByLabelText(/opening balance/i), {
      target: { value: "1250.5000" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith({
        name: "Maybank Savings",
        type: AccountType.BANK_ACCOUNT,
        currency: "MYR",
        openingBalance: "1250.5000",
      });
    });

    await waitFor(() => {
      expect(onCreated).toHaveBeenCalledWith(createdAccount);
    });

    expect(screen.getByRole("status").textContent).toBe(
      "Account created successfully.",
    );
  });

  it("displays an error when account creation fails", async () => {
    mutateAsyncMock.mockRejectedValueOnce(new Error("Network error"));

    render(<CreateAccountForm />);

    fireEvent.change(screen.getByLabelText(/account name/i), {
      target: { value: "Maybank Savings" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to create the account. Please check your connection and try again.",
    );
  });
});
