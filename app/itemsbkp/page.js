"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "./item.css"
import { Search, ChevronRight, ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
export default function ItemsPage({
  city = "",
}) {

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [allCategories, setAllCategories] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [openedCategory, setOpenedCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [visible, setVisible] = useState(12);
  useEffect(() => {
    const fetchProducts = async () => {
      const categorySnap = await getDocs(
        collection(
          db,
          "websites",
          "humanbiomedicalorg",
          "pages",
          "categoryproducts",
          "categories"
        )
      );

      const allProducts = [];
      const categoryList = [];

      categorySnap.forEach((categoryDoc) => {
        const data = categoryDoc.data();

        categoryList.push({
          id: categoryDoc.id,
          category: data.category || categoryDoc.id,
        });

        const categoryProducts = (data.products || [])
          .filter((p) => p.isPublished !== false)
          .map((item, index) => ({
            ...item,
            uid: `${categoryDoc.id}-${index}`,
            category: data.category || categoryDoc.id,
          }));

        allProducts.push(...categoryProducts);
      });

      const oldSnap = await getDoc(
        doc(
          db,
          "websites",
          "humanbiomedicalorg",
          "pages",
          "products"
        )
      );

      if (oldSnap.exists()) {
        const oldProducts = (oldSnap.data().products || [])
          .filter((p) => p.isPublished !== false)
          .map((item, index) => ({
            ...item,
            uid: `other-${index}`,
            category: "Other Products",
          }));

        allProducts.push(...oldProducts);
      }

      setProducts(allProducts);
      setAllCategories(categoryList);



      setLoading(false);
    };

    fetchProducts();
  }, []);
  /* AUTO SEARCH */
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.instrument}
      ${item.category}
    `.toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);
  const sortedGroupedProducts = useMemo(() => {

    const entries = Object.entries(groupedProducts);

    entries.sort(([a], [b]) => {

      if (a === "Other Products") return 1;
      if (b === "Other Products") return -1;

      return a.localeCompare(b);

    });

    return Object.fromEntries(entries);

  }, [groupedProducts]);

  const makeLink = (path = "") => {
    if (!city) return path;

    const slug = city
      .toLowerCase()
      .replace(/\s+/g, "-");

    return `/${slug}${path}`;
  };

  return (
    <main className="bg-[#f6fbff] min-h-screen">

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
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
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

          {!loading ? (

            <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-10 items-start">

              {/* LEFT SIDEBAR */}

              <aside className="category-sidebar lg:sticky lg:top-28 bg-white rounded-[30px] border border-slate-200 shadow-xl h-fit self-start">

                <h3 className="text-2xl font-bold mb-5">
                  Categories
                </h3>

                <input
                  type="text"
                  placeholder="Search Category..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-slate-300"
                />

                <div className="mt-5 space-y-3">

                  {Object.keys(sortedGroupedProducts)
                    .filter((category) =>
                      category
                        .toLowerCase()
                        .includes(categorySearch.toLowerCase())
                    )
                    .map((category) => (

                      <div
                        key={category}
                        className="border rounded-xl overflow-hidden"
                      >

                        <button
                          className="w-full p-4 flex items-center justify-between bg-white hover:bg-slate-50"
                          onClick={() =>
                            setOpenedCategory(
                              openedCategory === category
                                ? ""
                                : category
                            )
                          }
                        >

                          <div className="flex items-center gap-2">

                            {openedCategory === category ? (
                              <ChevronDown size={18} />
                            ) : (
                              <ChevronRight size={18} />
                            )}

                            <span>{category}</span>

                          </div>

                          <span>
                            {sortedGroupedProducts[category].length}
                          </span>

                        </button>

                        {openedCategory === category && (

                          <div className="border-t bg-slate-50">

                            {sortedGroupedProducts[category].map(
                              (product) => (

                                <button
                                  key={product.uid}
                                  className="block w-full text-left px-4 py-3 text-sm hover:bg-blue-50 border-b last:border-b-0"
                                  onClick={() => {

                                    document
                                      .getElementById(product.uid)
                                      ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                      });

                                  }}
                                >
                                  {product.title}
                                </button>

                              )
                            )}

                          </div>

                        )}

                      </div>

                    ))}

                </div>

              </aside>

              {/* RIGHT SIDE */}

              <div className="space-y-12">

                {Object.entries(sortedGroupedProducts).map(
                  ([category, list]) => (

                    <section
                      key={category}
                      className="mb-12"
                    >

                      <div className="flex justify-between border-b pb-4 mb-6">

                        <h2 className="text-3xl font-bold">
                          {category}
                        </h2>

                        <span>
                          {list.length} Products
                        </span>

                      </div>

                      <div className="space-y-6">
                        {list.map((product) => (

                          <div
                            id={product.uid}
                            key={product.uid || product.id}
                            className="category-product-card bg-white rounded-[32px] border shadow-lg p-8"
                          >

                            <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-center">

                              <div className="bg-slate-50 rounded-[30px] h-[260px] flex items-center justify-center p-6">

                                {(product.image || product.images?.[0]) ? (
                                  <img
                                    src={product.image || product.images?.[0]}
                                    alt={product.title}
                                    className="max-h-[180px] object-contain"
                                  />
                                ) : (
                                  <div className="text-center">
                                    <div className="text-5xl mb-2">🧪</div>

                                    <p className="text-sm text-slate-500">
                                      No Image Available
                                    </p>
                                  </div>
                                )}

                              </div>

                              <div className="min-w-0 flex flex-col justify-center">

                                <h3 className="text-[34px] font-bold leading-tight text-slate-900 mb-6">
                                  {product.title}
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">

                                  <div className="bg-slate-50 rounded-2xl p-4">
                                    <p className="text-xs uppercase text-slate-400 mb-1">
                                      Brand
                                    </p>

                                    <p className="font-semibold">
                                      {product.brand}
                                    </p>
                                  </div>

                                  <div className="bg-slate-50 rounded-2xl p-4">
                                    <p className="text-xs uppercase text-slate-400 mb-1">
                                      Model
                                    </p>

                                    <p className="font-semibold">
                                      {product.model}
                                    </p>
                                  </div>

                                  <div className="bg-slate-50 rounded-2xl p-4">
                                    <p className="text-xs uppercase text-slate-400 mb-1">
                                      Instrument
                                    </p>

                                    <p className="font-semibold">
                                      {product.instrument}
                                    </p>
                                  </div>

                                  <div className="bg-slate-50 rounded-2xl p-4">
                                    <p className="text-xs uppercase text-slate-400 mb-1">
                                      Throughput
                                    </p>

                                    <p className="font-semibold">
                                      {product.throughput}
                                    </p>
                                  </div>

                                </div>

                                <div className="mt-6">
                                  <Link
                                    href={
                                      city
                                        ? `/${city.toLowerCase().replace(/\s+/g, "-")}/items/${product.slug ||
                                        product.title
                                          ?.toLowerCase()
                                          .replace(/\s+/g, "-")
                                          .replace(/[^\w-]+/g, "")
                                        }`
                                        : `/items/${product.slug ||
                                        product.title
                                          ?.toLowerCase()
                                          .replace(/\s+/g, "-")
                                          .replace(/[^\w-]+/g, "")
                                        }`
                                    }
                                    className="category-view-btn bg-blue-600 text-white inline-flex items-center justify-center"
                                  >
                                    View Details
                                  </Link>
                                </div>

                              </div>



                            </div>

                          </div>

                        ))}

                      </div>

                    </section>

                  )
                )}

              </div>

            </div>

          ) : (

            <div className="text-center py-20">
              Loading...
            </div>

          )}
          {/* <div className="dna-pagination">

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
          </div> */}
        </div>

      </section>
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
        >
          <ChevronUp size={28} />
        </button>
      )}

      <Footer city={city} />

    </main >
  );
}