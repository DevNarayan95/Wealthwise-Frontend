import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { PublicLayout } from "./public-layout";

describe("PublicLayout", () => {
  it("renders nested route content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<h1>Login</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  });
});
