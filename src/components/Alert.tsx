type Props = {
  children: React.ReactNode;
  variant?: "info" | "error";
};

export default function Alert({ children, variant = "info" }: Props) {
  const styles =
    variant === "error"
      ? "border-danger/40 text-danger"
      : "border-border text-muted";
  return (
    <div role="alert" className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}
