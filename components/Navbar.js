"use client";

import { useEffect, useState } from "react";

export default function Navbar({ city = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const makeLink = (path = "") => {
    if (!city) {
      return path || "/";
    }

    const slug = city
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `/${slug}${path}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? "bg-white/80 backdrop-blur-2xl border-b border-blue-100 shadow-lg"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-20 flex items-center justify-between">
            {/* LOGO */}
            <a
              href={makeLink("")}
              className="flex items-center gap-3"
            >
              <img
                src="/humanlogo.png"
                alt="Human Biomedical"
                className="w-12 h-12 object-contain"
              />
            </a>

            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-10">
              <a
                href={makeLink("")}
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Home
              </a>

              <a
                href={makeLink("/about")}
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                About
              </a>

              <a
                href={makeLink("/items")}
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Products
              </a>

              <a
                href={makeLink("/services")}
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Services
              </a>

              <a
                href={makeLink("/contact")}
                className="text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Contact
              </a>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
              <a
                href={makeLink("/contact")}
                className="hidden lg:flex h-12 px-7 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold items-center justify-center shadow-xl hover:scale-105 transition duration-300"
              >
                Get Quote
              </a>

              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="lg:hidden relative w-12 h-12 rounded-2xl bg-white border border-blue-100 shadow-lg flex items-center justify-center"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute left-0 top-1 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen
                        ? "rotate-45 top-3"
                        : ""
                      }`}
                  ></span>

                  <span
                    className={`absolute left-0 top-3 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen
                        ? "opacity-0"
                        : ""
                      }`}
                  ></span>

                  <span
                    className={`absolute left-0 top-5 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen
                        ? "-rotate-45 top-3"
                        : ""
                      }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 lg:hidden ${menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }`}
        onClick={() =>
          setMenuOpen(false)
        }
      ></div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[320px] bg-white shadow-[0_20px_100px_rgba(0,0,0,0.2)] transition-all duration-500 lg:hidden ${menuOpen
            ? "translate-x-0"
            : "translate-x-full"
          }`}
      >
        <div className="p-6 border-b border-blue-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              Menu
            </h2>

            <p className="text-sm text-blue-600 font-medium mt-1">
              Human Biomedical
            </p>
          </div>

          <button
            onClick={() =>
              setMenuOpen(false)
            }
            className="w-12 h-12 rounded-2xl bg-blue-50 text-2xl text-blue-700"
          >
            ×
          </button>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <a
            href={makeLink("")}
            className="h-14 px-5 rounded-2xl hover:bg-blue-50 flex items-center text-gray-800 font-semibold transition"
          >
            Home
          </a>

          <a
            href={makeLink("/about")}
            className="h-14 px-5 rounded-2xl hover:bg-blue-50 flex items-center text-gray-800 font-semibold transition"
          >
            About
          </a>

          <a
            href={makeLink("/items")}
            className="h-14 px-5 rounded-2xl hover:bg-blue-50 flex items-center text-gray-800 font-semibold transition"
          >
            Products
          </a>

          <a
            href={makeLink("/services")}
            className="h-14 px-5 rounded-2xl hover:bg-blue-50 flex items-center text-gray-800 font-semibold transition"
          >
            Services
          </a>

          <a
            href={makeLink("/contact")}
            className="h-14 px-5 rounded-2xl hover:bg-blue-50 flex items-center text-gray-800 font-semibold transition"
          >
            Contact
          </a>

          <a
            href={makeLink("/contact")}
            className="mt-6 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center shadow-xl"
          >
            Get Free Quote
          </a>
        </div>
      </div>

      <div className="h-20"></div>
    </>
  );
}