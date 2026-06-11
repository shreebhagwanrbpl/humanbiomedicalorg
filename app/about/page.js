import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "About Human Biomedical | Premium Biomedical Company",

  description:
    "Human Biomedical provides advanced biomedical analyzers, pathology laboratory systems, healthcare automation, and modern medical technology solutions.",

  alternates: {
    canonical: "https://humanbiomedical.com/about",
  },
};

export default function About({
  district,
}) {
  const city = district
    ?.replace(/-/g, " ")
    ?.replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );
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
      {/* SEO */}
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Human Biomedical",
            url: "https://humanbiomedical.com",
          }),
        }}
      />

      <main className="bg-[#f8fbff] overflow-hidden">

        <Navbar city={city} />

        {/* HERO */}
        <section className="relative px-4 sm:px-6 pt-24 md:pt-36 pb-16 md:pb-28 overflow-hidden">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-[#eef8ff]"></div>

          {/* Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-7xl mx-auto">

            {/* TOP SMALL */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-100 shadow-md text-blue-700 font-medium">

                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>

                About Human Biomedical

              </div>

              <p className="text-blue-700 text-left md:text-right whitespace-nowrap">
                Advanced biomedical innovation and healthcare automation systems.
              </p>

            </div>

            {/* MAIN GRID */}
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center mt-12 md:mt-16">

              {/* LEFT SIDE */}
              <div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1] text-gray-900">

                  Healthcare
                  <span className="block text-blue-600">
                    Technology
                  </span>

                  Reimagined

                </h1>

                <p className="mt-6 text-base sm:text-lg text-gray-600 leading-7 sm:leading-9 max-w-xl">

                  Human Biomedical develops smart biomedical analyzers,
                  pathology laboratory systems, and future-ready healthcare
                  infrastructure solutions for hospitals and laboratories.

                </p>

                {/* Bottom Strip */}
                <div className="grid grid-cols-2 gap-6 mt-10 md:mt-14">

                  <div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-700">
                      500+
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Healthcare Clients
                    </p>

                  </div>

                  <div>

                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-cyan-600">
                      10+
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Years Experience
                    </p>

                  </div>

                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="relative">

                {/* Image */}
                <div className="relative rounded-[24px] md:rounded-[45px] overflow-hidden shadow-2xl">

                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1400&auto=format&fit=crop"
                    alt="Biomedical Technology"
                    className="w-full h-[350px] sm:h-[500px] lg:h-[750px] object-cover"
                  />

                </div>

                {/* Floating Top Card */}
                <div className="absolute top-4 left-4 md:top-8 md:-left-8 bg-white rounded-[20px] md:rounded-[30px] shadow-2xl border border-blue-100 p-4 md:p-8 w-[180px] md:w-64">

                  <p className="text-gray-500 text-sm uppercase tracking-[3px]">
                    Innovation
                  </p>

                  <h3 className="mt-3 text-2xl md:text-4xl font-black text-gray-900">
                    Smart Lab
                  </h3>

                  <p className="mt-4 text-gray-600 leading-7">

                    Advanced pathology laboratory automation systems.

                  </p>

                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:-right-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[20px] md:rounded-[30px] shadow-2xl p-4 md:p-8 w-[220px] md:w-72 text-white">
                  <p className="uppercase tracking-[3px] text-cyan-100 text-sm">
                    Healthcare Future
                  </p>

                  <h3 className="mt-3 text-2xl md:text-4xl font-black leading-tight">

                    Intelligent
                    <span className="block">
                      Diagnostics
                    </span>

                  </h3>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* BIG CONTENT SECTION */}
        <section className="px-6 py-24">

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* LEFT BIG CARD */}
            <div className="relative overflow-hidden rounded-[24px] md:rounded-[40px] bg-gradient-to-br from-[#0f172a] to-[#0b2447] p-6 sm:p-8 md:p-12 text-white shadow-2xl">

              <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">

                <p className="text-cyan-300 uppercase tracking-[3px] text-sm">
                  Our Mission
                </p>

                <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] break-words">

                  Revolutionizing
                  <span className="block">
                    Healthcare Infrastructure
                  </span>

                </h2>
                <p className="mt-6 text-sm sm:text-base md:text-lg text-blue-100 leading-7 md:leading-9">
                  We focus on delivering premium biomedical analyzers,
                  healthcare automation systems, and smart laboratory
                  technologies that improve efficiency, diagnostics,
                  and patient care.

                </p>

                {/* Features */}
                <div className="space-y-4 mt-8 md:mt-12">

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center">
                      🧪
                    </div>

                    <p className="text-sm sm:text-base md:text-lg">
                      Advanced Biomedical Diagnostics
                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center">
                      ⚙️
                    </div>

                    <p className="text-sm sm:text-base md:text-lg">
                      Smart Laboratory Automation
                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center">
                      🏥
                    </div>

                    <p className="text-sm sm:text-base md:text-lg">
                      Future Healthcare Technology
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT STACK */}
            <div className="flex flex-col gap-10">

              {/* CARD */}
              <div className="bg-white rounded-[40px] border border-blue-100 shadow-xl p-10">

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl shadow-lg">
                  🚀
                </div>

                <h3 className="mt-8 text-4xl font-black text-gray-900">
                  Innovation Driven
                </h3>

                <p className="mt-5 text-gray-600 leading-8 text-lg">

                  We continuously innovate biomedical technology and
                  diagnostic systems for modern healthcare environments.

                </p>

              </div>

              {/* CARD */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[24px] md:rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl text-white">

                <p className="uppercase tracking-[2px] md:tracking-[3px] text-cyan-100 text-xs md:text-sm">
                  Why Choose Us
                </p>

                <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] break-words">

                  Trusted By
                  <span className="block">
                    Healthcare Experts
                  </span>

                </h3>

                <p className="mt-5 text-sm sm:text-base md:text-lg text-blue-100 leading-7 md:leading-8">

                  Hospitals, laboratories, and healthcare institutions trust
                  Human Biomedical for advanced healthcare technology solutions.

                </p>

              </div>

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-28">

          <div className="max-w-7xl mx-auto rounded-[24px] md:rounded-[45px] bg-white border border-blue-100 shadow-2xl overflow-hidden">

            <div className="grid lg:grid-cols-2 items-center">

              {/* LEFT */}
              <div className="p-6 sm:p-8 md:p-12 md:p-20">

                <p className="uppercase tracking-[3px] text-blue-600 text-sm font-semibold">
                  Human Biomedical
                </p>

                <h2 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 leading-tight">

                  Building Smarter
                  <span className="block text-blue-600">
                    Healthcare Systems
                  </span>

                </h2>

                <p className="mt-8 text-lg text-gray-600 leading-8">

                  Discover premium biomedical analyzers, pathology systems,
                  and healthcare automation technologies.

                </p>

                <a
                  href={makeLink("/contact")}
                  className="inline-flex items-center justify-center mt-10 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-xl hover:scale-105 transition duration-300"
                >
                  Contact Our Team
                </a>

              </div>

              {/* RIGHT */}
              <div className="relative h-[300px] md:h-full md:min-h-[500px]">

                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
                  alt="Healthcare Technology"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>

          </div>
        </section>

        <Footer city={city} />

      </main>
    </>
  );
}