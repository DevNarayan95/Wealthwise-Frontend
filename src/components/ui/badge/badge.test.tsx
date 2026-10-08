import { render, screen } from "@testing-library/react";

import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>Active</Badge>);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("uses the default variant", () => {
    render(<Badge>Active</Badge>);

    expect(screen.getByText("Active")).toHaveClass("bg-surface-muted");
  });

  it("supports success variant", () => {
    render(<Badge variant="success">Active</Badge>);

    expect(screen.getByText("Active")).toHaveClass("bg-success-background");
  });

  it("supports warning variant", () => {
    render(<Badge variant="warning">Pending</Badge>);

    expect(screen.getByText("Pending")).toHaveClass("bg-warning-background");
  });

  it("supports danger variant", () => {
    render(<Badge variant="danger">Archived</Badge>);

    expect(screen.getByText("Archived")).toHaveClass("bg-danger-background");
  });

  it("supports info variant", () => {
    render(<Badge variant="info">Information</Badge>);

    expect(screen.getByText("Information")).toHaveClass("bg-info-background");
  });
});
