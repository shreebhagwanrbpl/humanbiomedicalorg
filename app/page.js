import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import HomeHero from "@/components/HomeHero";
import Link from "next/link";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const metadata = {
  title:
    "Human Biomedical | Advanced Biomedical Equipment & Healthcare Solutions",

  description:
    "Human Biomedical provides advanced biomedical analyzers, pathology laboratory systems, healthcare automation solutions, and medical diagnostic equipment for hospitals and laboratories.",

  keywords: [
    "Biomedical Equipment",
    "Medical Analyzer",
    "Diagnostic Equipment",
    "Hospital Equipment",
    "CLIA Analyzer",
    "Biochemistry Analyzer",
    "Healthcare Solutions",
    "Pathology Equipment",
    "Laboratory Equipment",
  ],

  alternates: {
    canonical: "https://humanbiomedical.org",
  },

  openGraph: {
    title:
      "Human Biomedical | Advanced Biomedical Equipment & Healthcare Solutions",
    description:
      "Advanced biomedical equipment, laboratory automation and healthcare technology solutions.",
    url: "https://humanbiomedical.org",
    siteName: "Human Biomedical",
    type: "website",
  },
};

async function getFeaturedProducts() {
  try {
    const productsRef = collection(db, "products");

    const q = query(
      productsRef,
      where("isPublished", "==", true),
      where("isFeatured", "==", true),
      limit(6)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Featured products error:", error);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const city = params?.city || "";

  const makeLink = (path = "") => {
    if (!city) {
      return path || "/";
    }

    const slug = city
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return `/${slug}${path}`;
  };

  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* =========================
          ORGANIZATION SCHEMA
      ========================== */}

      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Human Biomedical",
            url: "https://humanbiomedical.org",
            description:
              "Advanced biomedical equipment, laboratory automation and healthcare technology solutions.",
          }),
        }}
      />

      {/* =========================
          WEBSITE SCHEMA
      ========================== */}

      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Human Biomedical",
            url: "https://humanbiomedical.org",
          }),
        }}
      />

      <main className="min-h-screen overflow-hidden bg-white text-gray-900">
        {/* =========================
            NAVBAR
        ========================== */}

        <Navbar city={city} />

        {/* =========================
            HERO
        ========================== */}

        <HomeHero city={city} />

        {/* =========================
            TRUST STRIP
        ========================== */}

        <section className="relative z-10 -mt-8 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:grid-cols-4">
              <div className="border-b border-r border-gray-100 p-6 text-center md:border-b-0">
                <div className="text-3xl font-black text-gray-900">
                  10+
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Years Experience
                </p>
              </div>

              <div className="border-b border-gray-100 p-6 text-center md:border-b-0 md:border-r">
                <div className="text-3xl font-black text-gray-900">
                  500+
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Healthcare Clients
                </p>
              </div>

              <div className="border-r border-gray-100 p-6 text-center">
                <div className="text-3xl font-black text-gray-900">
                  24/7
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Technical Support
                </p>
              </div>

              <div className="p-6 text-center">
                <div className="text-3xl font-black text-gray-900">
                  Pan India
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Service Network
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            FEATURED PRODUCTS
        ========================== */}

        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">

            {/* Section Header */}

            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              <div className="max-w-3xl">

                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  Featured Products
                </span>

                <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
                  Advanced Equipment for
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                    Modern Laboratories
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                  Explore our selection of advanced biomedical analyzers,
                  laboratory systems and diagnostic equipment designed for
                  accuracy, efficiency and dependable healthcare operations.
                </p>

              </div>

              <Link
                href={makeLink("/items")}
                className="inline-flex w-fit items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-800 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                View All Products
                <span className="text-lg">→</span>
              </Link>

            </div>

            {/* Product Grid */}

       {featuredProducts.length > 0 ? (
  <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {featuredProducts.map((product, index) => {
      const productSlug =
        product?.slug ||
        product?.productSlug ||
        product?.citySlug ||
        product?.id ||
        `product-${index}`;

      const productImage =
        product?.image ||
        product?.imageUrl ||
        product?.thumbnail ||
        product?.productImage ||
        product?.images?.[0] ||
        "/images/product-placeholder.png";

      const productName =
        product?.name ||
        product?.productName ||
        product?.title ||
        "Biomedical Equipment";

      const productDescription =
        product?.description ||
        product?.shortDescription ||
        product?.productDescription ||
        "Advanced biomedical equipment designed for modern healthcare and laboratory requirements.";

      return (
        <Link
          key={product.id || index}
          href={makeLink(`/items/${productSlug}`)}
          className="group relative overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(15,23,42,0.12)]"
        >
          {/* IMAGE */}

          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50">

            <img
              src={productImage}
              alt={productName}
              className="h-full w-full object-contain p-8 transition duration-700 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm backdrop-blur">
              Featured
            </div>

          </div>

          {/* CONTENT */}

          <div className="p-6">

            {product?.category && (
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {product.category}
              </div>
            )}

            <h3 className="line-clamp-2 text-xl font-bold text-gray-950 transition group-hover:text-indigo-700">
              {productName}
            </h3>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
              {productDescription}
            </p>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

              <span className="text-sm font-bold text-gray-900">
                View Details
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 transition duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                →
              </span>

            </div>

          </div>
        </Link>
      );
    })}
  </div>
) : (
  <div className="mt-14 rounded-[30px] border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">

    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
      ⚕
    </div>

    <h3 className="mt-5 text-xl font-bold text-gray-900">
      Featured Products Coming Soon
    </h3>

    <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-gray-500">
      Our featured biomedical equipment will appear here once
      products are available.
    </p>

  </div>
)}

          </div>
        </section>

        {/* =========================
            SERVICES
        ========================== */}

        <section className="relative overflow-hidden bg-[#f7f8fc] py-24 md:py-32">

          {/* Background Decoration */}

          <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

          <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-purple-100/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

            <div className="mx-auto max-w-3xl text-center">

              <span className="inline-flex rounded-full border border-indigo-100 bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow-sm">
                Our Solutions
              </span>

              <h2 className="mt-6 text-4xl font-black tracking-tight text-gray-950 md:text-5xl">
                Complete Biomedical
                <span className="block text-indigo-700">
                  Technology Solutions
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-gray-600 md:text-lg">
                From diagnostic equipment to laboratory automation, we provide
                reliable technology solutions built around the evolving needs
                of modern healthcare.
              </p>

            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">

              {/* Card 1 */}

              <div className="group rounded-[30px] border border-gray-100 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-9">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl transition group-hover:scale-110">
                  🧪
                </div>

                <h3 className="mt-7 text-2xl font-bold text-gray-950">
                  Diagnostic Equipment
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  Advanced diagnostic analyzers and biomedical systems designed
                  to support accurate and efficient laboratory operations.
                </p>

                <Link
                  href={makeLink("/products")}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-indigo-700"
                >
                  Explore Equipment
                  <span>→</span>
                </Link>

              </div>

              {/* Card 2 */}

              <div className="group rounded-[30px] border border-gray-100 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-9">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl transition group-hover:scale-110">
                  ⚙️
                </div>

                <h3 className="mt-7 text-2xl font-bold text-gray-950">
                  Laboratory Automation
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  Smart laboratory automation solutions that help improve
                  workflow efficiency, productivity and operational consistency.
                </p>

                <Link
                  href={makeLink("/services")}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-indigo-700"
                >
                  Explore Services
                  <span>→</span>
                </Link>

              </div>

              {/* Card 3 */}

              <div className="group rounded-[30px] border border-gray-100 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-9">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl transition group-hover:scale-110">
                  🧬
                </div>

                <h3 className="mt-7 text-2xl font-bold text-gray-950">
                  Healthcare Technology
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  Integrated biomedical technology solutions for hospitals,
                  diagnostic centers, pathology labs and healthcare institutions.
                </p>

                <Link
                  href={makeLink("/about")}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-indigo-700"
                >
                  Learn More
                  <span>→</span>
                </Link>

              </div>

            </div>

          </div>
        </section>

        {/* =========================
            WHY HUMAN BIOMEDICAL
        ========================== */}

        <section className="py-24 md:py-32">

          <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700">
                Why Human Biomedical
              </span>

              <h2 className="mt-6 text-4xl font-black tracking-tight text-gray-950 md:text-5xl">
                Technology You Can
                <span className="block text-indigo-700">
                  Depend On
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                We combine biomedical technology, technical expertise and
                responsive support to help healthcare organizations operate
                with confidence.
              </p>

              <div className="mt-10 space-y-6">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-950">
                      Reliable Equipment
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Carefully selected biomedical equipment built for
                      dependable laboratory performance.
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-950">
                      Expert Technical Support
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Dedicated technical assistance to keep your systems
                      operating smoothly.
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-950">
                      Healthcare-Focused Solutions
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Solutions designed around real laboratory and healthcare
                      operational requirements.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="relative">

              <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-r from-indigo-100 to-purple-100 blur-2xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-gray-100 bg-white p-7 shadow-[0_25px_80px_rgba(15,23,42,0.1)] md:p-10">

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-3xl bg-gray-50 p-6">

                    <div className="text-3xl">🏥</div>

                    <div className="mt-5 text-2xl font-black text-gray-950">
                      Hospitals
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Reliable biomedical infrastructure
                    </p>

                  </div>

                  <div className="rounded-3xl bg-indigo-50 p-6">

                    <div className="text-3xl">🔬</div>

                    <div className="mt-5 text-2xl font-black text-gray-950">
                      Laboratories
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Advanced diagnostic solutions
                    </p>

                  </div>

                  <div className="rounded-3xl bg-purple-50 p-6">

                    <div className="text-3xl">🧫</div>

                    <div className="mt-5 text-2xl font-black text-gray-950">
                      Pathology
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Efficient laboratory systems
                    </p>

                  </div>

                  <div className="rounded-3xl bg-blue-50 p-6">

                    <div className="text-3xl">⚕️</div>

                    <div className="mt-5 text-2xl font-black text-gray-950">
                      Healthcare
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Complete technology support
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            CTA
        ========================== */}

        <section className="px-4 py-16 sm:px-6 md:py-24">

          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gray-950 px-6 py-16 sm:px-10 md:px-16 md:py-20">

            {/* Background */}

            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative">

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                Advanced Biomedical Technology
              </span>

              <h2 className="mt-7 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
                Upgrade Your
                <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                  Laboratory Infrastructure
                </span>
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">
                Discover advanced biomedical analyzers, laboratory automation
                systems and diagnostic solutions designed for modern hospitals,
                pathology laboratories and healthcare centers.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                <Link
                  href={makeLink("/products")}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 font-bold text-gray-950 transition hover:-translate-y-1 hover:bg-indigo-50"
                >
                  Explore Products
                  <span className="ml-2">→</span>
                </Link>

                <Link
                  href={makeLink("/contact")}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Talk to Our Experts
                </Link>

              </div>

              {/* CTA Stats */}

              <div className="mt-14 grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="text-3xl font-black text-white">
                    500+
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    Healthcare Clients
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="text-3xl font-black text-white">
                    24/7
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    Technical Support
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="text-3xl font-black text-white">
                    10+
                  </div>

                  <p className="mt-1 text-sm text-gray-400">
                    Years Experience
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            FOOTER
        ========================== */}

        <Footer city={city} />

      </main>
    </>
  );
}