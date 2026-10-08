import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("uses button type by default", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("supports submit buttons", () => {
    render(<Button type="submit">Save</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("disables the button when disabled", () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading state and disables the button", () => {
    render(<Button loading>Save</Button>);

    const button = screen.getByRole("button", { name: "Loading..." });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("calls the click handler", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Save</Button>);

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
