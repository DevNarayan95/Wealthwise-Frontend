import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./input";

describe("Input", () => {
  it("renders an input", () => {
    render(<Input aria-label="Email" />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("supports user input", async () => {
    const user = userEvent.setup();

    render(<Input aria-label="Email" />);

    const input = screen.getByRole("textbox");

    await user.type(input, "narayan@example.com");

    expect(input).toHaveValue("narayan@example.com");
  });

  it("supports placeholder text", () => {
    render(<Input aria-label="Email" placeholder="Enter your email" />);

    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<Input aria-label="Email" disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("supports error state", () => {
    render(<Input aria-label="Email" error />);

    expect(screen.getByRole("textbox")).toHaveClass("border-danger");
  });

  it("supports native input types", () => {
    render(<Input aria-label="Password" type="password" />);

    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });
});
