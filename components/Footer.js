"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer({
  city = "",
}) {
  const [contactInfo, setContactInfo] = useState([]);
  const [stateName, setStateName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch("/api/site-data?type=page&page=contact");
        if (res.ok) {
          const json = await res.json();
          const pageData = json?.data || json;
          setContactInfo(pageData?.contactInfo || []);
        }
      } catch (error) {
        console.error("[Footer] Error fetching contact:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  const isDistrict = Boolean(
    city &&
      typeof city === "string" &&
      city.trim() !== "" &&
      city.trim().toLowerCase() !== "india"
  );

  useEffect(() => {
    const fetchDistrict = async () => {
      if (!isDistrict) return;

      try {
        const res = await fetch(
          `/api/site-data?type=district&district=${encodeURIComponent(city.toLowerCase().trim())}`
        );
        if (res.ok) {
          const json = await res.json();
          const districtData = json?.data || json;
          if (districtData?.state) {
            setStateName(districtData.state);
          }
        }
      } catch (error) {
        console.error("[Footer] Error fetching district:", error);
      }
    };

    fetchDistrict();
  }, [city, isDistrict]);

  const getValue = (label) => {
    return (
      contactInfo.find(
        (item) =>
          item.label
            ?.toLowerCase()
            .trim() ===
          label.toLowerCase().trim()
      )?.value || ""
    );
  };

  const makeLink = (path = "") => {
    if (!isDistrict) {
      return path || "/";
    }

    const slug = city
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return `/${slug}${path}`;
  };

  const phone = getValue("Phone");
  const email = getValue("Email");
  const address = getValue("Address");

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
              <p>Biomedical Equipment</p>
              <p>Diagnostic Solutions</p>
              <p>Hospital Automation</p>
              <p>Lab Installation</p>
              <p>Maintenance Support</p>
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
                    {isDistrict
                      ? `${city}${stateName ? `, ${stateName}` : ""}, India`
                      : (address || "India")}
                  </p>

                  {phone && (
                    <p>
                      📞 {phone}
                    </p>
                  )}

                  {email && (
                    <p>
                      📧 {email}
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-4 mt-5">
              <a
                href="https://www.instagram.com/humanbiomedicals/"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl bg-white shadow-md border border-pink-100 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Human Biomedical. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}