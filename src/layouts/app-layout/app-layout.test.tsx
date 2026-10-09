import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { AppLayout } from "./app-layout";

function renderAppLayout(initialEntry = "/dashboard") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/accounts" element={<h1>Accounts page</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("AppLayout", () => {
  it("renders nested route content", () => {
    renderAppLayout();

    expect(
      screen.getByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();
  });

  it("renders sidebar navigation", () => {
    renderAppLayout();

    expect(
      screen.getAllByRole("navigation", { name: "Main navigation" }).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("opens and closes mobile navigation", () => {
    renderAppLayout();

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));

    expect(
      screen.getByRole("button", { name: "Close navigation" }),
    ).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: "Close navigation" }));

    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("closes mobile navigation when Escape is pressed", () => {
    renderAppLayout();

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    fireEvent.keyDown(document, { key: "Escape" });

    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("closes mobile navigation when a navigation link is selected", () => {
    renderAppLayout();

    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));

    const accountsLinks = screen.getAllByRole("link", { name: "Accounts" });
    fireEvent.click(accountsLinks[accountsLinks.length - 1]);

    expect(
      screen.getByRole("heading", { name: "Accounts page" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("locks background scrolling while open and restores it when closed", async () => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";

    try {
      renderAppLayout();

      fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("hidden");
      });

      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("auto");
      });
    } finally {
      document.body.style.overflow = previousOverflow;
    }
  });
});
