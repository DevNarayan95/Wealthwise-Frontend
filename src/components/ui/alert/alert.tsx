import type { HTMLAttributes, ReactNode } from "react";

type AlertVariant = "default" | "info" | "success" | "warning" | "danger";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: AlertVariant;
}

const variantClasses: Record<AlertVariant, string> = {
  default: "border-border bg-surface-muted text-foreground",
  info: "border-info/30 bg-info-background text-info",
  success: "border-success/30 bg-success-background text-success",
  warning: "border-warning/30 bg-warning-background text-warning",
  danger: "border-danger/30 bg-danger-background text-danger",
};

export function Alert({
  children,
  variant = "default",
  className = "",
  role = "status",
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      role={role}
      className={[
        "rounded-md border px-4 py-3 text-sm",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
