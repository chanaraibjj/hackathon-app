export default function Header({ title = "Hackathon App" }: { title?: string }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-sm font-bold">{title}</span>
      </div>
    </header>
  );
}
