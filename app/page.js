import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import HomeHero from "@/components/HomeHero"
export const metadata = {
  title:
    "Human Biomedical | Advanced Biomedical Equipment & Healthcare Solutions",

  description:
    "Premium biomedical analyzers, pathology laboratory systems, healthcare automation solutions, and advanced medical diagnostic equipment.",

  keywords: [
    "Biomedical Equipment",
    "Medical Analyzer",
    "Diagnostic Equipment",
    "Hospital Equipment",
    "CLIA Analyzer",
    "Biochemistry Analyzer",
    "Healthcare Solutions",
  ],

  alternates: {
    canonical: "https://humanbiomedical.org",
  },
};

export default function Home({ city = "" }) {
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
      {/* SEO SCHEMA */}
      <Script
        id="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Human Biomedical",
            url: "https://humanbiomedical.org",
          }),
        }}
      />

      <main className="overflow-hidden bg-[#f5fbff]">
        <Navbar city={city} />
        <HomeHero city={city} />


        {/* FEATURES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28">

          <div className="text-center">

            <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
              Premium Services
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-black text-gray-900">
              Advanced Healthcare Solutions
            </h2>

            <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
              High-performance biomedical technology and healthcare systems
              designed for modern hospitals and laboratories.
            </p>

          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 md:mt-20">

            <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-xl border border-blue-100 hover:-translate-y-3 transition duration-300">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg">
                🏥
              </div>

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                Diagnostic Equipment
              </h3>

              <p className="mt-5 text-gray-600 leading-8">
                Premium diagnostic systems with advanced biomedical technology.
              </p>

            </div>

            <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-xl border border-cyan-100 hover:-translate-y-3 transition duration-300">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg">
                ⚙️
              </div>

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                Laboratory Automation
              </h3>

              <p className="mt-5 text-gray-600 leading-8">
                Smart laboratory automation systems optimized for healthcare.
              </p>

            </div>

            <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-xl border border-blue-100 hover:-translate-y-3 transition duration-300">

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg">
                🧬
              </div>

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                Medical Technology
              </h3>

              <p className="mt-5 text-gray-600 leading-8">
                Innovative biomedical solutions for hospitals and laboratories.
              </p>

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">

          <div className="max-w-7xl mx-auto">

            {/* Glass Box */}
            <div className="relative overflow-hidden rounded-[24px] md:rounded-[40px] p-6 sm:p-8 md:p-12 lg:p-20">
              {/* Small Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">

                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>

                Premium Healthcare Technology

              </div>

              {/* Heading */}
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-gray-900 max-w-5xl">

                Upgrade Your
                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                  Laboratory Infrastructure
                </span>

              </h2>

              {/* Description */}
              <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 leading-7 md:leading-9 max-w-3xl">

                Discover next-generation biomedical analyzers, healthcare automation systems,
                pathology laboratory solutions, and advanced medical diagnostic equipment
                designed for hospitals, laboratories, and healthcare centers.

              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <a
                  href={makeLink("/about")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-xl hover:scale-105 transition duration-300 text-center"
                >
                  <span className="relative z-10">
                    About Us
                  </span>
                </a>

                <a
                  href={makeLink("/services")}
                  className="w-full sm:w-auto px-8 py-4  px-10 py-5 rounded-2xl border border-blue-100 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition duration-300"
                >
                  Our Services
                </a>

              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 md:mt-20">

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-8">

                  <h3 className="text-4xl md:text-5xl font-black">
                    500+
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Healthcare Clients Worldwide
                  </p>

                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-3xl p-8">

                  <h3 className="text-4xl md:text-5xl font-black">
                    24/7
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Technical & Biomedical Support
                  </p>

                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-8">

                  <h3 className="text-4xl md:text-5xl font-black">
                    10+
                  </h3>

                  <p className="mt-3 text-gray-600">
                    Years of Industry Experience
                  </p>

                </div>

              </div>
            </div>
          </div>
        </section>

        <Footer city={city} />
      </main>
    </>
  );
}