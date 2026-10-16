"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ city = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const makeLink = (path = "") => {
    if (!city || city.toLowerCase().trim() === "india") {
      return path || "/";
    }

    const slug = city
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return `/${slug}${path}`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-md py-2.5"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link
              href={makeLink("")}
              className="flex items-center gap-3 group"
              aria-label="Human Biomedical Homepage"
            >
              <div className="relative w-11 h-11 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-50 to-blue-100/50 p-1 border border-blue-100">
                <Image
                  src="/humanlogo.png"
                  alt="Human Biomedical Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Human <span className="text-blue-600">Biomedical</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                  {city && city.toLowerCase() !== "india" ? `Equipment & Lab Supplies • ${city}` : "Diagnostic & Medical Equipment"}
                </span>
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-700">
              <Link
                href={makeLink("")}
                className="hover:text-blue-600 transition-colors py-1"
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="hover:text-blue-600 transition-colors py-1"
              >
                About
              </Link>

              <Link
                href={makeLink("/items")}
                className="hover:text-blue-600 transition-colors py-1"
              >
                Products
              </Link>

              <Link
                href={makeLink("/services")}
                className="hover:text-blue-600 transition-colors py-1"
              >
                Services
              </Link>

              <Link
                href={makeLink("/contact")}
                className="hover:text-blue-600 transition-colors py-1"
              >
                Contact
              </Link>
            </nav>

            {/* RIGHT SIDE CTA */}
            <div className="flex items-center gap-3">
              <Link
                href={makeLink("/contact")}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-700 active:scale-95 transition-all duration-200"
              >
                Get Quote
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 ${
                      menuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`block h-0.5 w-full bg-slate-800 rounded-full transition-all duration-300 ${
                      menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[290px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/humanlogo.png"
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-bold text-slate-900">Human Biomedical</span>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-lg font-bold"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="p-5 flex flex-col gap-2 overflow-y-auto flex-1 text-slate-800 font-semibold">
          <Link
            href={makeLink("")}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            href={makeLink("/about")}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
          >
            About Us
          </Link>

          <Link
            href={makeLink("/items")}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Products Catalog
          </Link>

          <Link
            href={makeLink("/services")}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Services & AMC
          </Link>

          <Link
            href={makeLink("/contact")}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Contact Us
          </Link>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold flex items-center justify-center shadow-md active:scale-95 transition"
            >
              Get Free Quotation
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer to push content below fixed navbar */}
      <div className="h-16 sm:h-20" aria-hidden="true"></div>
    </>
  );
}