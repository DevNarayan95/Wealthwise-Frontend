import type { LabelHTMLAttributes, ReactNode } from "react";

interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

export function FieldLabel({
  children,
  required = false,
  ...props
}: FieldLabelProps) {
  return (
    <label
      {...props}
      className="mb-1.5 block text-sm font-medium text-foreground"
    >
      {children}

      {required ? (
        <span aria-hidden="true" className="ml-1 text-danger">
          *
        </span>
      ) : null}
    </label>
  );
}
