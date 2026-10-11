import { describe, expect, it } from "vitest";

import { accountFormSchema } from "./account-form.schema";
import { AccountType } from "../types/accounts.types";

const validInput = {
  name: "Maybank Savings",
  type: AccountType.BANK_ACCOUNT,
  currency: "MYR",
  openingBalance: "1250.5000",
};

describe("accountFormSchema", () => {
  it("accepts valid account data", () => {
    expect(accountFormSchema.safeParse(validInput).success).toBe(true);
  });

  it("trims the name and normalizes currency", () => {
    const result = accountFormSchema.safeParse({
      ...validInput,
      name: "  Maybank Savings  ",
      currency: " myr ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toBe("Maybank Savings");
      expect(result.data.currency).toBe("MYR");
    }
  });

  it("rejects an empty account name", () => {
    const result = accountFormSchema.safeParse({
      ...validInput,
      name: "   ",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an account name longer than 150 characters", () => {
    const result = accountFormSchema.safeParse({
      ...validInput,
      name: "A".repeat(151),
    });

    expect(result.success).toBe(false);
  });

  it("rejects unsupported account types", () => {
    const result = accountFormSchema.safeParse({
      ...validInput,
      type: "UNSUPPORTED",
    });

    expect(result.success).toBe(false);
  });

  it("rejects invalid currency formats", () => {
    const invalidCurrencies = ["MY", "MYRR", "123", "M1R", ""];

    for (const currency of invalidCurrencies) {
      expect(
        accountFormSchema.safeParse({
          ...validInput,
          currency,
        }).success,
      ).toBe(false);
    }
  });

  it("accepts valid financial decimal strings", () => {
    const validBalances = [
      "0",
      "1250",
      "1250.5",
      "1250.5000",
      "-1250.5000",
      "999999999999999.9999",
    ];

    for (const openingBalance of validBalances) {
      expect(
        accountFormSchema.safeParse({
          ...validInput,
          openingBalance,
        }).success,
      ).toBe(true);
    }
  });

  it("rejects invalid financial decimal strings", () => {
    const invalidBalances = [
      "",
      ".50",
      "1.",
      "1.12345",
      "1000000000000000",
      "--10",
      "1e3",
      " 100 ",
    ];

    for (const openingBalance of invalidBalances) {
      expect(
        accountFormSchema.safeParse({
          ...validInput,
          openingBalance,
        }).success,
      ).toBe(false);
    }
  });
});
