import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "./select";

describe("Select", () => {
  it("renders a select element", () => {
    render(
      <Select aria-label="Account type">
        <option value="cash">Cash</option>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders options", () => {
    render(
      <Select aria-label="Account type">
        <option value="cash">Cash</option>
        <option value="bank">Bank</option>
      </Select>,
    );

    expect(screen.getByRole("option", { name: "Cash" })).toBeInTheDocument();

    expect(screen.getByRole("option", { name: "Bank" })).toBeInTheDocument();
  });

  it("supports changing the selected value", async () => {
    const user = userEvent.setup();

    render(
      <Select aria-label="Account type" defaultValue="cash">
        <option value="cash">Cash</option>
        <option value="bank">Bank</option>
      </Select>,
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "bank");

    expect(select).toHaveValue("bank");
  });

  it("can be disabled", () => {
    render(
      <Select aria-label="Account type" disabled>
        <option value="cash">Cash</option>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("supports error state", () => {
    render(
      <Select aria-label="Account type" error>
        <option value="cash">Cash</option>
      </Select>,
    );

    expect(screen.getByRole("combobox")).toHaveClass("border-danger");
  });
});
