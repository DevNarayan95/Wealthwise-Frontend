import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AppHeader } from "./app-header";

describe("AppHeader", () => {
  it("renders the application branding", () => {
    render(
      <MemoryRouter>
        <AppHeader navigationOpen={false} onToggleNavigation={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "WealthWise" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Personal Finance")).toBeInTheDocument();
  });

  it("reports the closed navigation state", () => {
    render(
      <MemoryRouter>
        <AppHeader navigationOpen={false} onToggleNavigation={vi.fn()} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("reports the open navigation state", () => {
    render(
      <MemoryRouter>
        <AppHeader navigationOpen onToggleNavigation={vi.fn()} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "Close navigation" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("calls the toggle callback when the menu button is clicked", () => {
    const onToggleNavigation = vi.fn();

    render(
      <MemoryRouter>
        <AppHeader
          navigationOpen={false}
          onToggleNavigation={onToggleNavigation}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));

    expect(onToggleNavigation).toHaveBeenCalledTimes(1);
  });
});
