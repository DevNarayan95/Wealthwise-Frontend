import { render, screen } from "@testing-library/react";

import { MenuIcon } from "./menu-icon";

describe("MenuIcon", () => {
  it("renders the menu icon when closed", () => {
    render(<MenuIcon open={false} />);

    expect(screen.getByTestId("menu-icon-path")).toBeInTheDocument();
    expect(screen.queryByTestId("close-icon-path")).not.toBeInTheDocument();
  });

  it("renders the close icon when open", () => {
    render(<MenuIcon open />);

    expect(screen.getByTestId("close-icon-path")).toBeInTheDocument();
    expect(screen.queryByTestId("menu-icon-path")).not.toBeInTheDocument();
  });
});
