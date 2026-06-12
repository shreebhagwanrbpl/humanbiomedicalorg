"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Footer({
  city = "",
}) {

  const [contactInfo, setContactInfo] =
    useState([]);

  const [stateName, setStateName] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "humanbiomedicalorg",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  useEffect(() => {
    const fetchDistrict = async () => {
      if (!city) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "humanbiomedicalorg",
            "districts",
            city.toLowerCase()
          )
        );

        if (snap.exists()) {
          setStateName(
            snap.data().state || ""
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDistrict();
  }, [city]);

  const getValue = (label) => {
    return (
      contactInfo.find(
        (item) =>
          item.label
            ?.toLowerCase()
            .trim() ===
          label.toLowerCase()
      )?.value || ""
    );
  };

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
    <footer className="mt-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-white border-t border-blue-100">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Company */}
          <div>

            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Human Biomedical
            </h2>

            {loading ? (
              <div className="space-y-3 animate-pulse">

                <div className="h-4 bg-gray-200 rounded"></div>

                <div className="h-4 bg-gray-200 rounded"></div>

                <div className="h-4 bg-gray-200 rounded w-4/5"></div>

                <div className="h-4 bg-gray-200 rounded w-3/4"></div>

              </div>
            ) : (
              <p className="text-gray-600 leading-7">

                Premium biomedical equipment and healthcare solutions provider delivering advanced laboratory diagnostics and hospital automation systems.

              </p>
            )}

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">

              <a
                href={makeLink("")}
                className="hover:text-blue-600 transition"
              >
                Home
              </a>

              <a
                href={makeLink("/about")}
                className="hover:text-blue-600 transition"
              >
                About
              </a>

              <a
                href={makeLink("/items")}
                className="hover:text-blue-600 transition"
              >
                Products
              </a>

              <a
                href={makeLink("/services")}
                className="hover:text-blue-600 transition"
              >
                Services
              </a>

              <a
                href={makeLink("/contact")}
                className="hover:text-blue-600 transition"
              >
                Contact
              </a>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">

              <p>
                Biomedical Equipment
              </p>

              <p>
                Diagnostic Solutions
              </p>

              <p>
                Hospital Automation
              </p>

              <p>
                Lab Installation
              </p>

              <p>
                Maintenance Support
              </p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Info
            </h3>

            <div className="flex flex-col gap-3 text-gray-600">

              {loading ? (
                <>
                  <div className="h-5 w-52 bg-gray-200 rounded animate-pulse"></div>

                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>

                  <div className="h-5 w-56 bg-gray-200 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <p>
                    📍{" "}
                    {city
                      ? `${city}, ${stateName}, India`
                      : getValue("Office")}
                  </p>

                  <p>
                    📞 {getValue("Phone")}
                  </p>

                  <p>
                    📧 {getValue("Email")}
                  </p>
                </>
              )}

            </div>

            <div className="flex gap-4 mt-5">

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white shadow-md border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white shadow-md border border-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white shadow-md border border-cyan-100 flex items-center justify-center text-cyan-600 hover:bg-cyan-600 hover:text-white transition duration-300"
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-blue-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Human Biomedical. All rights reserved.
          </p>

          {/* <div className="flex gap-6 text-sm text-gray-500">

            <a
              href="#"
              className="hover:text-blue-600 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-blue-600 transition"
            >
              Terms & Conditions
            </a>

            <a
              href="/sitemap.xml"
              className="hover:text-blue-600 transition"
            >
              Sitemap
            </a>

          </div> */}

        </div>

      </div>

    </footer>
  );
}