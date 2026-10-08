import { render, screen } from "@testing-library/react";

import { Card } from "./card";

describe("Card", () => {
  it("renders its children", () => {
    render(
      <Card>
        <h2>Account</h2>
      </Card>,
    );

    expect(
      screen.getByRole("heading", { name: "Account" }),
    ).toBeInTheDocument();
  });

  it("supports custom class names", () => {
    render(<Card className="p-6">Account</Card>);

    expect(screen.getByText("Account")).toHaveClass("p-6");
  });

  it("supports HTML attributes", () => {
    render(
      <Card aria-label="Account card" data-testid="account-card">
        Account
      </Card>,
    );

    const card = screen.getByTestId("account-card");

    expect(card).toHaveAttribute("aria-label", "Account card");
  });
});
