import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, GraduationCap, ClipboardCheck, Truck, Settings, LifeBuoy, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import beakers from "@/assets/beakers.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Installation, Calibration & AMC | Raj Biosis" },
      { name: "description", content: "Complete lifecycle services for lab and medical equipment: consultation, installation, calibration, training and AMC." },
      { property: "og:title", content: "Services — Installation, Calibration & AMC | Raj Biosis" },
      { property: "og:description", content: "Complete lifecycle services: consultation, installation, calibration, training and AMC." },
      { property: "og:image", content: beakers },
      { name: "twitter:image", content: beakers },
    ],
      }),
      component: ServicesPage,
    });

    const services = [
      { icon: ClipboardCheck, title: "Lab Consultation", desc: "End-to-end planning to design efficient, compliant laboratory workflows." },
      { icon: Truck, title: "Supply & Delivery", desc: "Sourcing and timely pan-India delivery from our nationwide network." },
      { icon: Wrench, title: "Installation", desc: "Certified engineers handle setup, validation and commissioning on-site." },
      { icon: Settings, title: "Calibration", desc: "Traceable calibration and preventive maintenance to keep results accurate." },
      { icon: GraduationCap, title: "Training", desc: "Hands-on operator training to maximize uptime and instrument lifespan." },
      { icon: LifeBuoy, title: "AMC & Support", desc: "Annual maintenance contracts with fast response and genuine spare parts." },
    ];

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="End-to-end support, every step of the way"
        description="Equipment is only as good as the team behind it. From planning to long-term care, our specialists keep your instruments performing at their best."
      />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border/60 bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-brand-foreground shadow-soft">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-muted py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">A process designed around you</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">From the first call to long-term partnership — here's how we work with your team.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { n: "01", t: "Discover", d: "Understand your needs and constraints." },
              { n: "02", t: "Recommend", d: "Curate the right instruments." },
              { n: "03", t: "Deliver", d: "Install, validate and train." },
              { n: "04", t: "Support", d: "Ongoing service and care." },
            ].map((step) => (
              <div key={step.n} className="rounded-2xl bg-card p-6 text-left shadow-soft ring-1 ring-border/60">
                <span className="font-serif text-sm font-semibold text-brand">{step.n}</span>
                <h4 className="mt-2 font-serif text-lg font-semibold">{step.t}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="mt-12 bg-gradient-brand text-brand-foreground shadow-soft">
            <Link to="/contact">Discuss your project <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
