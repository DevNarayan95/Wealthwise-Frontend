import { render, screen } from "@testing-library/react";

import { FieldLabel } from "./field-label";

describe("FieldLabel", () => {
  it("renders the label", () => {
    render(<FieldLabel htmlFor="email">Email</FieldLabel>);

    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("associates with a form control", () => {
    render(<FieldLabel htmlFor="email">Email</FieldLabel>);

    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("shows required indicator", () => {
    render(<FieldLabel required>Email</FieldLabel>);

    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
