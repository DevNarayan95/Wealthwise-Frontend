import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Sidebar } from "./sidebar";

describe("Sidebar", () => {
  it("renders links from the navigation model", () => {
    render(
      <MemoryRouter initialEntries={["/accounts"]}>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: "Accounts" })).toHaveAttribute(
      "href",
      "/accounts",
    );
    expect(screen.getByRole("link", { name: "Transactions" })).toHaveAttribute(
      "href",
      "/transactions",
    );
  });

  it("marks the current route as active", () => {
    render(
      <MemoryRouter initialEntries={["/accounts"]}>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Accounts" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("calls onNavigate when a link is selected", () => {
    const onNavigate = vi.fn();

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Sidebar onNavigate={onNavigate} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("link", { name: "Accounts" }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it("works when onNavigate is omitted", () => {
    render(
      <MemoryRouter initialEntries={["/accounts"]}>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Accounts" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
