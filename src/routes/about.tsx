import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Target, Eye, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import teamImg from "@/assets/team.jpg";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Raj Biosis — Our Story & Mission" },
      { name: "description", content: "Learn about Raj Biosis — 15+ years of supplying premium laboratory and medical equipment to clinical and research institutions." },
      { property: "og:title", content: "About Raj Biosis — Our Story & Mission" },
      { property: "og:description", content: "15+ years of supplying premium laboratory and medical equipment to leading institutions." },
      { property: "og:image", content: teamImg },
      { name: "twitter:image", content: teamImg },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Our Mission", text: "To equip every laboratory and clinic with reliable, world-class instruments that advance human health." },
  { icon: Eye, title: "Our Vision", text: "To be India's most trusted partner in laboratory and medical equipment by 2030." },
  { icon: Users, title: "Our People", text: "A passionate team of biomedical engineers, scientists and service experts." },
];

const points = [
  "Authorized distributor for leading global brands",
  "In-house service & calibration team",
  "Custom lab planning and turnkey installation",
  "Comprehensive training and after-sales care",
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Built on precision. Driven by purpose."
        description="For over 15 years, Raj Biosis has helped hospitals, diagnostic centers and research labs deliver better outcomes with the right equipment and unwavering support."
      />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-border/60">
          <img src={teamImg} alt="Raj Biosis team in laboratory" loading="lazy" width={1400} height={1000} className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">Our Story</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">A partner you can rely on</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Founded with a simple commitment — to bring honest, high-quality scientific equipment to Indian
            laboratories — Raj Biosis has grown into a trusted name across hospitals, universities and
            biotech research centers.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8 bg-gradient-brand text-brand-foreground">
            <Link to="/contact">Work with us</Link>
          </Button>
        </div>
      </section>

      <section className="bg-surface-muted py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-card p-8 shadow-soft ring-1 ring-border/60">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
