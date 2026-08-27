import type { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent ${className}`}
      {...props}
    />
  );
}
