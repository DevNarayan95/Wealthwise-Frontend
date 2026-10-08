import type { ReactNode } from "react";

interface FieldErrorProps {
  children?: ReactNode;
}

export function FieldError({ children }: FieldErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p role="alert" className="mt-1.5 text-sm text-danger">
      {children}
    </p>
  );
}
