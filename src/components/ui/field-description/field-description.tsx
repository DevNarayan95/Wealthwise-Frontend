import type { HTMLAttributes, ReactNode } from "react";

interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function FieldDescription({
  children,
  className = "",
  ...props
}: FieldDescriptionProps) {
  return (
    <p
      {...props}
      className={["mt-1.5 text-sm text-slate-500", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
