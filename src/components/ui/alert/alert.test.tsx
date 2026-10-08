import { render, screen } from "@testing-library/react";

import { Alert } from "./alert";

describe("Alert", () => {
  it("renders its content", () => {
    render(<Alert>Account created successfully.</Alert>);

    expect(
      screen.getByText("Account created successfully."),
    ).toBeInTheDocument();
  });

  it("uses status role by default", () => {
    render(<Alert>Account created successfully.</Alert>);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("supports alert role", () => {
    render(
      <Alert variant="danger" role="alert">
        Transaction failed.
      </Alert>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("supports success variant", () => {
    render(<Alert variant="success">Success</Alert>);

    expect(screen.getByRole("status")).toHaveClass("bg-success-background");
  });

  it("supports warning variant", () => {
    render(<Alert variant="warning">Warning</Alert>);

    expect(screen.getByRole("status")).toHaveClass("bg-warning-background");
  });

  it("supports danger variant", () => {
    render(<Alert variant="danger">Error</Alert>);

    expect(screen.getByRole("status")).toHaveClass("bg-danger-background");
  });

  it("supports info variant", () => {
    render(<Alert variant="info">Information</Alert>);

    expect(screen.getByRole("status")).toHaveClass("bg-info-background");
  });
});
