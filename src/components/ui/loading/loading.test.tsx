import { render, screen } from "@testing-library/react";

import { Loading } from "./loading";

describe("Loading", () => {
  it("renders a loading status", () => {
    render(<Loading />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses the default loading label", () => {
    render(<Loading />);

    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
  });

  it("supports a custom loading label", () => {
    render(<Loading label="Loading accounts" />);

    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading accounts",
    );
  });

  it("supports small size", () => {
    render(<Loading size="sm" />);

    expect(screen.getByRole("status")).toHaveClass("h-4", "w-4");
  });

  it("supports large size", () => {
    render(<Loading size="lg" />);

    expect(screen.getByRole("status")).toHaveClass("h-8", "w-8");
  });
});
