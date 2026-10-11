import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/ui/button/button";
import { Card } from "../../../components/ui/card/card";
import { FieldError } from "../../../components/ui/field-error/field-error";
import { FieldLabel } from "../../../components/ui/field-label/field-label";
import { Input } from "../../../components/ui/input/input";
import { Select } from "../../../components/ui/select/select";
import { useCreateAccount } from "../queries/use-accounts";

import {
  accountFormSchema,
  type AccountFormValues,
} from "../schemas/account-form.schema";

import { AccountType, type Account } from "../types/accounts.types";

interface CreateAccountFormProps {
  onCreated?: (account: Account) => void;
}

const accountTypeOptions = [
  { value: AccountType.BANK_ACCOUNT, label: "Bank account" },
  { value: AccountType.CASH, label: "Cash" },
  { value: AccountType.CREDIT_CARD, label: "Credit card" },
  { value: AccountType.INVESTMENT, label: "Investment" },
  { value: AccountType.OTHER, label: "Other" },
];

export function CreateAccountForm({ onCreated }: CreateAccountFormProps) {
  const createAccountMutation = useCreateAccount();

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "",
      type: AccountType.BANK_ACCOUNT,
      currency: "MYR",
      openingBalance: "0",
    },
  });

  const isPending = isSubmitting || createAccountMutation.isPending;

  const onSubmit = async (values: AccountFormValues) => {
    setSubmissionError(null);
    setSuccessMessage(null);

    try {
      const response = await createAccountMutation.mutateAsync(values);

      reset();

      setSuccessMessage("Account created successfully.");
      onCreated?.(response.data);
    } catch {
      setSubmissionError(
        "Unable to create the account. Please check your connection and try again.",
      );
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Create account</h2>
        <p className="mt-1 text-sm text-gray-600">
          Add an account to track your finances.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Account name */}
        <div>
          <FieldLabel htmlFor="account-name" required>
            Account name
          </FieldLabel>

          <Input
            id="account-name"
            autoComplete="off"
            placeholder="e.g. Maybank Savings"
            maxLength={150}
            error={Boolean(errors.name)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "account-name-error" : undefined}
            {...register("name")}
          />

          <FieldError>{errors.name?.message}</FieldError>
        </div>

        {/* Account type */}
        <div>
          <FieldLabel htmlFor="account-type" required>
            Account type
          </FieldLabel>

          <Select
            id="account-type"
            error={Boolean(errors.type)}
            aria-invalid={Boolean(errors.type)}
            aria-describedby={errors.type ? "account-type-error" : undefined}
            {...register("type")}
          >
            {accountTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <FieldError>{errors.type?.message}</FieldError>
        </div>

        {/* Account currency */}
        <div>
          <FieldLabel htmlFor="account-currency" required>
            Currency
          </FieldLabel>

          <Input
            id="account-currency"
            placeholder="MYR"
            maxLength={3}
            autoCapitalize="characters"
            error={Boolean(errors.currency)}
            aria-invalid={Boolean(errors.currency)}
            aria-describedby={
              errors.currency ? "account-currency-error" : undefined
            }
            {...register("currency")}
          />

          <FieldError>{errors.currency?.message}</FieldError>
        </div>

        {/* Opening Balance */}
        <div>
          <FieldLabel htmlFor="account-opening-balance" required>
            Opening balance
          </FieldLabel>

          <Input
            id="account-opening-balance"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            error={Boolean(errors.openingBalance)}
            aria-invalid={Boolean(errors.openingBalance)}
            aria-describedby={
              errors.openingBalance
                ? "account-opening-balance-error"
                : undefined
            }
            {...register("openingBalance")}
          />

          <p className="mt-1 text-sm text-gray-600">
            Enter up to 15 integer digits and 4 decimal places.
          </p>

          <FieldError>{errors.openingBalance?.message}</FieldError>
        </div>

        {submissionError && (
          <p role="alert" className="text-sm text-red-600">
            {submissionError}
          </p>
        )}

        {successMessage && (
          <p role="status" className="text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" loading={isPending}>
            Create account
          </Button>
        </div>
      </form>
    </Card>
  );
}
