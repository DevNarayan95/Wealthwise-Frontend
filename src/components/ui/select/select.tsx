import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({
  error = false,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={[
        "block min-h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground",
        "outline-none transition-colors",
        "focus:border-primary focus:ring-2 focus:ring-primary/20",
        "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-70",
        error
          ? "border-danger focus:border-danger focus:ring-danger/20"
          : "border-border",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </select>
  );
}
