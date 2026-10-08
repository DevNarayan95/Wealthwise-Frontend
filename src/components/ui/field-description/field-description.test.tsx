import { render, screen } from "@testing-library/react";

import { FieldDescription } from "./field-description";

describe("FieldDescription", () => {
  it("renders the description", () => {
    render(<FieldDescription>Enter your email address.</FieldDescription>);

    expect(screen.getByText("Enter your email address.")).toBeInTheDocument();
  });

  it("supports custom attributes", () => {
    render(
      <FieldDescription id="email-description">
        Enter your email address.
      </FieldDescription>,
    );

    expect(screen.getByText("Enter your email address.")).toHaveAttribute(
      "id",
      "email-description",
    );
  });
});
