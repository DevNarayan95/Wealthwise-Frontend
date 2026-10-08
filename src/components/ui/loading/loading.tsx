import type { HTMLAttributes } from "react";

type LoadingSize = "sm" | "md" | "lg";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoadingSize;
  label?: string;
}

const sizeClasses: Record<LoadingSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-2",
};

export function Loading({
  size = "md",
  label = "Loading",
  className = "",
  ...props
}: LoadingProps) {
  return (
    <div
      {...props}
      role="status"
      aria-label={label}
      className={[
        "inline-block animate-spin rounded-full border-border border-t-primary",
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
