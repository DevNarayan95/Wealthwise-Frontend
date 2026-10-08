import type { ReactNode } from "react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We were unable to complete this request. Please try again.",
  action,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-lg border border-danger/30 bg-danger-background px-6 py-12 text-center"
    >
      <h2 className="text-lg font-semibold text-danger">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-danger/80">{description}</p>

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
