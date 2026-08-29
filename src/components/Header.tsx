import Link from "next/link";

const NAV = [
  { href: "/lp", label: "はじめに" },
  { href: "/", label: "送信前チェック" },
  { href: "/analyze", label: "やり取り分析" },
  { href: "/library", label: "言いかえ" },
  { href: "/guide", label: "わたしの取説" },
];

export default function Header({ title = "Hackathon App" }: { title?: string }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-2xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" className="text-sm font-bold">
          {title}
        </Link>
        <nav className="flex items-center gap-3 text-xs">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-muted transition hover:underline"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
