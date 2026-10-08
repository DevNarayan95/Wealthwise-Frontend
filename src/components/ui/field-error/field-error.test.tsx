import { render, screen } from "@testing-library/react";

import { FieldError } from "./field-error";

describe("FieldError", () => {
  it("renders the error message", () => {
    render(<FieldError>Email is required.</FieldError>);

    expect(screen.getByRole("alert")).toHaveTextContent("Email is required.");
  });

  it("renders nothing without an error", () => {
    const { container } = render(<FieldError />);

    expect(container).toBeEmptyDOMElement();
  });
});
