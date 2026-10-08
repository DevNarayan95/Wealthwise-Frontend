import { render, screen } from "@testing-library/react";

import { ErrorState } from "./error-state";

describe("ErrorState", () => {
  it("renders the default error message", () => {
    render(<ErrorState />);

    expect(screen.getByRole("alert")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Something went wrong",
      }),
    ).toBeInTheDocument();
  });

  it("supports a custom title", () => {
    render(<ErrorState title="Unable to load accounts" />);

    expect(
      screen.getByRole("heading", {
        name: "Unable to load accounts",
      }),
    ).toBeInTheDocument();
  });

  it("supports a custom description", () => {
    render(<ErrorState description="Please try again later." />);

    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
  });

  it("renders an action when provided", () => {
    render(<ErrorState action={<button type="button">Retry</button>} />);

    expect(
      screen.getByRole("button", {
        name: "Retry",
      }),
    ).toBeInTheDocument();
  });
});
