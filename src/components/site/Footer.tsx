import { Link } from "@tanstack/react-router";
import { FlaskConical, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";


export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-17 w-17 items-center justify-center rounded-lg  shadow-soft overflow-hidden">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-contain items-center"
          />
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Trusted partner for laboratory and medical equipment — empowering
            healthcare and research with precision instruments and dependable service.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/products", label: "Products" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-sm font-semibold text-foreground">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-brand" /> info@rajbiosis.com</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-brand" /> 099833 334690</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-brand" /> Jaipur, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Raj Biosis. All rights reserved.</p>
          <p>Crafted with care for healthcare professionals.</p>
        </div>
      </div>
    </footer>
  );
}
