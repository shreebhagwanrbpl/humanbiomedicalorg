"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function Services({
  city = "",
}) {

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const snap = await getDoc(
        doc(
          db,
          "websites",
          "humanbiomedicalorg",
          "pages",
          "services"
        )
      );

      if (snap.exists()) {
        setServices(
          snap.data().services || []
        );
      }
    };

    fetchServices();
  }, []);
  const makeLink = (path = "") => {
    if (!city) return path;

    const slug = city
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `/${slug}${path}`;
  };

  return (
    <>
      {/* SEO */}
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Human Biomedical",
            url: "https://humanbiomedical.org/services",
          }),
        }}
      />

      <main className="bg-[#f7fbff] overflow-hidden">

        <Navbar city={city} />

        {/* HERO */}
        <section className="relative px-4 sm:px-6 pt-24 md:pt-36 pb-16 md:pb-24 overflow-hidden">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50"></div>

          {/* Glow */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-7xl mx-auto">

            {/* GRID */}
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-center">

              {/* LEFT CONTENT */}
              <div>

                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-white border border-blue-100 shadow-md text-blue-700 font-medium">

                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>

                  Human Biomedical Services

                </span>

                <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-[1] text-gray-900">

                  Advanced
                  <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                    Healthcare Services
                  </span>

                </h1>

                <p className="mt-6 text-base sm:text-lg text-gray-600 leading-7 md:leading-9 max-w-3xl">

                  Human Biomedical delivers professional biomedical equipment
                  installation, laboratory automation, healthcare technology
                  support, maintenance services, and diagnostic system solutions
                  for hospitals and laboratories.

                </p>


              </div>

              {/* RIGHT ROADMAP */}
              <div className="relative h-[760px] hidden lg:block">

                {/* OFFICE */}
                <div className="absolute top-0 left-10 z-20">

                  <div className="bg-white rounded-[35px] shadow-2xl border border-blue-100 p-5">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
                      alt="Office"
                      className="w-40"
                    />

                  </div>

                </div>

                {/* ROAD */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 700 760"
                  fill="none"
                >

                  {/* Road */}
                  <path
                    d="
        M180 120
        C520 180, 520 320, 320 430
        C120 530, 220 670, 520 700
      "
                    stroke="#17345d"
                    strokeWidth="75"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* White Line */}
                  <path
                    d="
        M180 120
        C520 180, 520 320, 320 430
        C120 530, 220 670, 520 700
      "
                    stroke="white"
                    strokeWidth="5"
                    strokeDasharray="18 18"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                {/* CAR */}
                <div className="absolute top-[380px] left-[250px] z-30 rotate-[-35deg]">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
                    alt="Car"
                    className="w-20 drop-shadow-2xl"
                  />

                </div>

                {/* CLIENT */}
                <div className="absolute bottom-0 right-0 z-20">

                  <div className="bg-white rounded-[40px] border border-blue-100 shadow-2xl p-8 w-[260px]">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Client"
                      className="w-32 mx-auto"
                    />

                    <div className="text-center mt-5">

                      <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                        You
                      </h3>

                      <p className="mt-3 text-gray-500 leading-7 text-sm">

                        Biomedical solutions delivered directly to healthcare professionals.

                      </p>

                    </div>

                  </div>

                </div>

              </div>
              <div className="lg:hidden mt-10">

                <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/619/619153.png"
                    alt="Office"
                    className="w-24 mx-auto"
                  />

                  <div className="flex justify-center my-5">
                    <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></div>
                  </div>

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
                    alt="Car"
                    className="w-14 mx-auto"
                  />

                  <div className="flex justify-center my-5">
                    <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full"></div>
                  </div>

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Client"
                    className="w-24 mx-auto"
                  />

                  <p className="text-center mt-5 text-gray-600">
                    Healthcare solutions delivered directly to professionals.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* PROCESS */}
        <section className="px-4 sm:px-6 py-16 md:py-28">

          <div className="max-w-7xl mx-auto">

            {/* Top */}
            <div className="text-center">

              <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
                Our Process
              </span>

              <h2 className="mt-4 text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 leading-tight">

                Reliable Biomedical
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Service Workflow
                </span>

              </h2>

            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-20">

              {services.map((service, index) => {

                const active =
                  index === 1;

                return (
                  <div
                    key={index}
                    className={
                      active
                        ? "bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[24px] md:rounded-[35px] p-6 md:p-10 shadow-2xl text-white"
                        : "bg-white rounded-[24px] md:rounded-[35px] p-6 md:p-10 border border-blue-100 shadow-xl"
                    }
                  >

                    <div
                      className={
                        active
                          ? "text-4xl md:text-6xl font-black text-white/20"
                          : index % 2 === 0
                            ? "text-4xl md:text-6xl font-black text-blue-100"
                            : "text-4xl md:text-6xl font-black text-cyan-100"
                      }
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3
                      className={
                        active
                          ? "mt-8 text-2xl md:text-3xl font-black"
                          : "mt-8 text-2xl md:text-3xl font-black text-gray-900"
                      }
                    >
                      {service.title}
                    </h3>

                    <p
                      className={
                        active
                          ? "mt-5 text-blue-100 leading-8"
                          : "mt-5 text-gray-600 leading-8"
                      }
                    >
                      {service.desc}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>
        </section>

        <Footer city={city} />

      </main>
    </>
  );
}