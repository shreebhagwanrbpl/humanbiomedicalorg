import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import microscopeImg from "@/assets/microscope.jpg";
import analyzer from "@/assets/analyzer.jpg";
import beakers from "@/assets/beakers.jpg";
import heroLab from "@/assets/hero-lab.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Lab & Medical Equipment Catalog | Raj Biosis" },
      { name: "description", content: "Browse our curated catalog of microscopes, analyzers, centrifuges, autoclaves and laboratory consumables." },
      { property: "og:title", content: "Products — Lab & Medical Equipment Catalog | Raj Biosis" },
      { property: "og:description", content: "Microscopes, analyzers, centrifuges, autoclaves and laboratory consumables." },
      { property: "og:image", content: analyzer },
      { name: "twitter:image", content: analyzer },
    ],
  }),
  component: ProductsPage,
});

const products = [
  { name: "Binocular Microscope BX-200", category: "Microscopy", desc: "High-resolution optics with LED illumination for clinical & research use.", img: microscopeImg },
  { name: "Benchtop Centrifuge CF-12", category: "Diagnostics", desc: "Variable speed up to 12,000 RPM with brushless motor and safety lid lock.", img: analyzer },
  { name: "Hematology Analyzer HA-3000", category: "Diagnostics", desc: "Fully automated 3-part differential analyzer with touch interface.", img: heroLab },
  { name: "Laboratory Glassware Set", category: "General Lab", desc: "Borosilicate beakers, flasks and pipettes — autoclavable and durable.", img: beakers },
  { name: "Vertical Autoclave VA-50L", category: "Sterilization", desc: "Stainless steel chamber with digital controls and dual safety system.", img: analyzer },
  { name: "pH & Conductivity Meter", category: "General Lab", desc: "Bench unit with auto-calibration and data logging via USB.", img: microscopeImg },
];
const categories = ["All", "Microscopy", "Diagnostics", "Sterilization", "General Lab"];

function ProductsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title="A catalog built for performance"
        description="Discover instruments selected for accuracy, durability and ease of use — backed by the Raj Biosis service promise."
      />
      
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <span key={c} className="cursor-default rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-brand hover:text-brand">
              {c}
            </span>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="group overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-border/60 transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">{p.category}</span>
                <h3 className="mt-2 font-serif text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center text-sm font-medium text-brand">
                  Request quote <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-soft p-10 text-center shadow-soft ring-1 ring-border/60">
          <h2 className="font-serif text-3xl font-semibold">Looking for something specific?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Our catalog spans 2,000+ items. Tell us what you need and we'll source it.</p>
          <Button asChild size="lg" className="mt-6 bg-gradient-brand text-brand-foreground shadow-soft">
            <Link to="/contact">Talk to a specialist</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
