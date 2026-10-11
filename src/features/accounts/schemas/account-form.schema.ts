import { z } from "zod";

import { AccountType } from "../types/accounts.types";

export const accountFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Account name is required.")
    .max(150, "Account name must not exceed 150 characters."),

  type: z.enum(AccountType),

  currency: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}$/, "Currency must contain exactly 3 letters."),

  openingBalance: z
    .string()
    .regex(
      /^-?\d{1,15}(?:\.\d{1,4})?$/,
      "Opening balance must have up to 15 integer digits and 4 decimal places.",
    ),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
