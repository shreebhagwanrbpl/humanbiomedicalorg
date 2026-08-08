import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Raj Biosis — Get a Quote" },
      { name: "description", content: "Get in touch with Raj Biosis for product enquiries, quotes and service requests. Call, email or send a message." },
      { property: "og:title", content: "Contact Raj Biosis — Get a Quote" },
      { property: "og:description", content: "Reach our specialists for product enquiries, quotes and service requests." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: "info@rajbiosis.com" },
  { icon: Phone, label: "Phone", value: "099833 33469" },
  { icon: MapPin, label: "Office", value: "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar,on Ajmer-Delhi, 200 Feet Bypass Rd, Jaipur, Rajasthan 302021"},
  { icon: Clock, label: "Hours", value: "Mon – Sat, 9:30 AM – 7:00 PM" },
];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! We'll get back to you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's build something accurate"
        description="Whether you're sourcing a single instrument or planning a full lab — our team is ready to help."
      />
      
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold">Get in touch</h2>
            <p className="mt-2 text-sm text-muted-foreground">Reach us directly through any of these channels.</p>
            <div className="mt-8 space-y-5">
              {channels.map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-1 text-sm font-medium text-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-border/60 bg-card p-8 shadow-card lg:col-span-3">
            <h2 className="font-serif text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fill the form and we'll respond within one business day.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required placeholder="Dr. Jane Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="jane@hospital.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="+91 ..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org">Organization</Label>
                <Input id="org" name="org" placeholder="Apex Diagnostics" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" name="message" required rows={5} placeholder="Tell us about the equipment or service you need..." />
              </div>
            </div>
            <Button type="submit" disabled={submitting} size="lg" className="mt-6 w-full bg-gradient-brand text-brand-foreground shadow-soft sm:w-auto">
              {submitting ? "Sending..." : <>Send message <Send className="ml-1 h-4 w-4" /></>}
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
