import type { SelectHTMLAttributes } from "react";

export default function Select({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
