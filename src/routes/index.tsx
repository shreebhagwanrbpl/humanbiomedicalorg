import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Microscope, ShieldCheck, Truck, HeartPulse, Sparkles, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import heroLab from "@/assets/hero-lab.jpg";
import microscopeImg from "@/assets/microscope.jpg";
import beakers from "@/assets/beakers.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raj Biosis — Premium Lab & Medical Equipment" },
      { name: "description", content: "Raj Biosis supplies precision laboratory and medical equipment to hospitals, diagnostic centers and research labs across India." },
      { property: "og:title", content: "Raj Biosis — Premium Lab & Medical Equipment" },
      { property: "og:description", content: "Trusted partner for laboratory and medical equipment, serving hospitals, diagnostic centers and research labs." },
      { property: "og:image", content: heroLab },
      { name: "twitter:image", content: heroLab },
    ],
  }),
  component: HomePage,
});

const features = [
  { icon: ShieldCheck, title: "Certified Quality", desc: "ISO-compliant equipment from globally trusted manufacturers." },
  { icon: Truck, title: "Pan-India Delivery", desc: "Fast, insured shipping with on-site installation support." },
  { icon: HeartPulse, title: "24/7 Service", desc: "Dedicated technical support and AMC for every instrument." },
  { icon: Sparkles, title: "Tailored Solutions", desc: "Custom lab setups designed to your workflow and budget." },
];

const categories = [
  { title: "Microscopy", desc: "Compound, stereo & digital microscopes", img: microscopeImg },
  { title: "Diagnostics", desc: "Analyzers, centrifuges & autoclaves", img: heroLab },
  { title: "General Lab", desc: "Glassware, reagents & consumables", img: beakers },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_70%_30%,oklch(0.55_0.11_210/0.18),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-3 py-1 text-xs font-medium text-brand backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Trusted by 500+ labs
            </span>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
              Precision equipment for modern healthcare
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Raj Biosis delivers premium laboratory and medical instruments — engineered for accuracy,
              built for reliability, supported for life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-brand text-brand-foreground shadow-glow hover:opacity-95">
                <Link to="/products">Explore Products <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-white/60 backdrop-blur">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div><span className="font-serif text-2xl font-semibold text-foreground">15+</span><div className="text-xs">Years</div></div>
              <div className="h-8 w-px bg-border" />
              <div><span className="font-serif text-2xl font-semibold text-foreground">500+</span><div className="text-xs">Clients</div></div>
              <div className="h-8 w-px bg-border" />
              <div><span className="font-serif text-2xl font-semibold text-foreground">2k+</span><div className="text-xs">Products</div></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-10 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl bg-card shadow-glow ring-1 ring-border/60">
              <img src={heroLab} alt="Modern medical laboratory with premium equipment" width={1600} height={1100} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface-muted py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">Our Catalog</span>
            <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Equipment for every discipline</h2>
            <p className="mt-4 text-muted-foreground">From microscopy to diagnostics, we curate the instruments your team relies on every day.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.title} to="/products" className="group overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-brand">View range <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-brand p-10 text-brand-foreground shadow-glow md:p-16">
          <Microscope className="h-8 w-8 opacity-80" />
          <blockquote className="mt-6 max-w-3xl font-serif text-2xl leading-snug md:text-3xl">
            "Raj Biosis has been our primary equipment partner for over a decade. Their consistency in
            quality and service is unmatched in the industry."
          </blockquote>
          <div className="mt-6 flex items-center gap-3 text-sm">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
            <span className="opacity-90">Dr. Anjali Mehta — Director, Apex Diagnostics</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-border/60 bg-gradient-soft p-10 text-center shadow-soft md:p-16">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">Ready to upgrade your lab?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Talk to our specialists for a personalized recommendation and competitive pricing.</p>
          <Button asChild size="lg" className="mt-6 bg-gradient-brand text-brand-foreground shadow-soft">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
