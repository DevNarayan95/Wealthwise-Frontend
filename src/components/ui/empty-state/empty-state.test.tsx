import { render, screen } from "@testing-library/react";

import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders the title", () => {
    render(<EmptyState title="No accounts yet" />);

    expect(
      screen.getByRole("heading", {
        name: "No accounts yet",
      }),
    ).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(
      <EmptyState
        title="No accounts yet"
        description="Create your first account."
      />,
    );

    expect(screen.getByText("Create your first account.")).toBeInTheDocument();
  });

  it("does not render a description when omitted", () => {
    render(<EmptyState title="No accounts yet" />);

    expect(
      screen.queryByText("Create your first account."),
    ).not.toBeInTheDocument();
  });

  it("renders an action when provided", () => {
    render(
      <EmptyState
        title="No accounts yet"
        action={<button type="button">Create account</button>}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Create account",
      }),
    ).toBeInTheDocument();
  });
});
