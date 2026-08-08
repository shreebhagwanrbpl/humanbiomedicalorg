import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
         <div className="flex h-17 w-17 items-center justify-center rounded-lg  shadow-soft overflow-hidden">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
          <div className="leading-tight">
            <div className="font-serif text-lg font-semibold text-foreground">Raj Biosis</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Private Limited
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild className="bg-gradient-brand text-brand-foreground shadow-soft hover:opacity-95">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-gradient-brand text-brand-foreground">
              <Link to="/contact" onClick={() => setOpen(false)}>Get a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
