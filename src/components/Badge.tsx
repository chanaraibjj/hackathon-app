type Props = {
  children: React.ReactNode;
  variant?: "neutral" | "success" | "danger";
};

export default function Badge({ children, variant = "neutral" }: Props) {
  const styles = {
    neutral: "border-border text-muted",
    success: "border-success text-success",
    danger: "border-danger text-danger",
  }[variant];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles}`}
    >
      {children}
    </span>
  );
}
