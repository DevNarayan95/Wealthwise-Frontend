import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error = false, className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={[
        "block w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground",
        "placeholder:text-slate-400",
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
    />
  );
}
