import Badge from "@/components/Badge";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

// First View用。eyebrow=小さなラベル、childrenにCTA等を置ける
export default function Hero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="flex flex-col gap-2">
      {eyebrow && (
        <div>
          <Badge>{eyebrow}</Badge>
        </div>
      )}
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {description && <p className="text-sm text-muted">{description}</p>}
      {children}
    </section>
  );
}
