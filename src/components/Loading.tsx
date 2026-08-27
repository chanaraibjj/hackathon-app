export default function Loading({ label = "処理中..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted" aria-live="polite">
      <span className="size-4 animate-spin rounded-full border-2 border-border border-t-accent" />
      {label}
    </div>
  );
}
