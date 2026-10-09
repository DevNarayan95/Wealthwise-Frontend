import { describe, expect, it } from "vitest";

import { navigationItems } from "./navigation";

describe("navigationItems", () => {
  it("contains the primary application destinations", () => {
    expect(navigationItems).toEqual([
      {
        label: "Dashboard",
        path: "/dashboard",
      },
      {
        label: "Accounts",
        path: "/accounts",
      },
      {
        label: "Transactions",
        path: "/transactions",
      },
    ]);
  });
});
