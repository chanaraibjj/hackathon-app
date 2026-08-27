type Props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function EmptyState({
  title = "まだ何もありません",
  description,
  children,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border px-6 py-10 text-center">
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="text-xs text-muted">{description}</p>}
      {children}
    </div>
  );
}
