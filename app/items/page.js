"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "./item.css"
import Link from "next/link";
export default function ItemsPage({
  city = "",
}) {

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 9;
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDoc(
        doc(
          db,
          "websites",
          "humanbiomedicalorg",
          "pages",
          "products"
        )
      );

      if (snap.exists()) {
        const data = snap.data();

        setProducts(
          (data.products || []).filter(
            (item) => item.isPublished !== false
          )
        );
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);
  /* AUTO SEARCH */
  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      `${item.title} ${item.brand} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const makeLink = (path = "") => {
    if (!city) return path;

    const slug = city
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `/${slug}${path}`;
  };
  const totalPages = Math.ceil(
    products.length / productsPerPage
  );

  const paginatedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  return (
    <main className="bg-[#f6fbff] min-h-screen overflow-hidden">

      <Navbar city={city} />

      {/* HERO */}
      <section className="relative px-4 sm:px-6 pt-32 pb-24">

        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-[#eef8ff]"></div>

        {/* Glow */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* TOP */}
          <div className="flex flex-col xl:flex-row gap-10 xl:items-end xl:justify-between">

            <div className="max-w-4xl">

              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-blue-100 shadow-md text-blue-700 font-medium">

                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>

                Human Biomedical Products

              </span>

              <h1 className="mt-8 text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95] text-gray-900">

                Smart
                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                  Product Catalog
                </span>

              </h1>

            </div>

            <div className="xl:max-w-md bg-white/80 backdrop-blur-2xl border border-white shadow-xl rounded-[35px] p-8">

              <p className="text-gray-600 leading-8 text-lg">

                Explore advanced biomedical analyzers, healthcare automation
                systems, pathology laboratory devices, and smart diagnostics.

              </p>

            </div>

          </div>

          {/* SEARCH */}
          <div className="mt-20 relative">

            <div className="bg-white rounded-[35px] border border-blue-100 shadow-2xl p-5">

              <div className="relative">

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search biomedical products..."
                  className="w-full h-20 pl-20 pr-6 rounded-3xl bg-[#f8fbff] border border-blue-100 outline-none focus:border-blue-500 text-lg"
                />

                <span className="absolute left-7 top-1/2 -translate-y-1/2 text-3xl">
                  🔍
                </span>

              </div>

            </div>

            {/* AUTO SEARCH DROPDOWN */}
            {search && (
              <div className="absolute top-full left-0 w-full mt-4 bg-white rounded-[30px] border border-blue-100 shadow-2xl overflow-hidden z-50">

                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 5).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSearch("");
                      }}
                      className="w-full flex items-center gap-5 p-5 hover:bg-blue-50 transition border-b border-blue-50"
                    >

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 rounded-2xl object-cover"
                      />

                      <div className="text-left">

                        <h3 className="text-2xl font-black text-gray-900">

                          {item.title}

                        </h3>

                        <p className="mt-1 text-blue-600 font-semibold">

                          {item.brand}

                        </p>

                      </div>

                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500 text-lg">

                    No products found

                  </div>
                )}

              </div>
            )}

          </div>

          {loading ? (
            <div className="grid lg:grid-cols-3 gap-8 mt-10">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[35px] border border-blue-100 shadow-xl overflow-hidden animate-pulse"
                >
                  <div className="h-56 bg-gray-200"></div>

                  <div className="p-8">
                    <div className="h-8 w-32 bg-gray-200 rounded-full"></div>

                    <div className="mt-5 h-6 bg-gray-200 rounded"></div>
                    <div className="mt-3 h-6 bg-gray-200 rounded w-4/5"></div>

                    <div className="mt-4 h-5 bg-gray-200 rounded w-1/2"></div>
                    <div className="mt-2 h-5 bg-gray-200 rounded w-1/3"></div>

                    <div className="mt-6 h-12 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 mt-10">

              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-[35px] border border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300"                >

                  {/* IMAGE */}

                  <div className="relative h-72 flex items-center justify-center">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="
      w-full
      h-full
      object-contain
      p-4
      transition-all
      duration-500
      group-hover:scale-110
    "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-8">

                    {/* BRAND */}
                    <div className="inline-flex px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">

                      Brand: {product.brand}

                    </div>

                    {/* TITLE */}
                    <h2 className="mt-5 text-xl font-bold text-gray-900 leading-snug min-h-[70px]">

                      Product: {product.title}

                    </h2>
                    <p className="text-gray-500">
                      Throughput : {product.throughput}
                    </p>
                    <p className="text-gray-500">
                      Model : {product.model}
                    </p>

                    {/* BUTTON */}
                    <Link
                      href={
                        city
                          ? `/${city.toLowerCase().replace(/\s+/g, "-")}/items/${product.slug}`
                          : `/items/${product.slug}`
                      }
                      className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      Get Quote
                    </Link>

                  </div>

                </div>
              ))}

            </div>
          )}
          <div className="dna-pagination">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="dna-nav-btn"
            >
              ← Prev
            </button>

            <div className="dna-track">

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`dna-node ${currentPage === index + 1 ? "active" : ""
                    }`}
                />
              ))}

            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="dna-nav-btn"
            >
              Next →
            </button>

          </div>

          <div className="dna-batch">
            Batch {String(currentPage).padStart(2, "0")} of{" "}
            {String(totalPages).padStart(2, "0")}
          </div>
        </div>

      </section>


      <Footer city={city} />

    </main>
  );
}