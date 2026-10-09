import { render, screen } from "@testing-library/react";

import { HomePage } from "./home-page";

describe("HomePage", () => {
  it("renders the WealthWise application name", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "WealthWise",
      }),
    ).toBeInTheDocument();
  });
});
