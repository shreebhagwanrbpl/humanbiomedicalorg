interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.55_0.11_210/0.12),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
        {eyebrow && (
          <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
