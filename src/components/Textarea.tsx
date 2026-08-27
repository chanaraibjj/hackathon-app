import type { TextareaHTMLAttributes } from "react";

export default function Textarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-accent ${className}`}
      {...props}
    />
  );
}
