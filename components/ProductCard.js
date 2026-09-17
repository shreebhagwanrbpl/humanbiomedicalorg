import React from "react";
import Link from "next/link";

const ProductCard = React.memo(function ProductCard({ product, district }) {
  const linkHref = district
    ? `/${district}/items/${product.slug}`
    : `/items/${product.slug}`;

  return (
    <div
      id={product.slug}
      className="bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_180px] gap-5 lg:gap-8 items-center">
        {/* Image */}
        <div className="relative h-[180px] sm:h-[220px] rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-100 flex items-center justify-center">
          <img
            src={product.images?.[0] || product.image || "/placeholder.jpg"}
            alt={product.title || product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            <Link href={linkHref} className="hover:text-sky-700 transition">
              {product.title || product.name}
            </Link>
          </h3>

          <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base line-clamp-2">
            {product.description ||
              product.desc ||
              "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-4">
            {product.brand && (
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Brand</p>
                <p className="font-semibold text-slate-800 mt-0.5 text-xs sm:text-sm truncate">{product.brand}</p>
              </div>
            )}
            {product.model && (
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Model</p>
                <p className="font-semibold text-slate-800 mt-0.5 text-xs sm:text-sm truncate">{product.model}</p>
              </div>
            )}
            {product.instrument && (
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Instrument</p>
                <p className="font-semibold text-slate-800 mt-0.5 text-xs sm:text-sm truncate">{product.instrument}</p>
              </div>
            )}
            {product.capacity && (
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Capacity</p>
                <p className="font-semibold text-slate-800 mt-0.5 text-xs sm:text-sm truncate">{product.capacity}</p>
              </div>
            )}
            {product.throughput && (
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Throughput</p>
                <p className="font-semibold text-slate-800 mt-0.5 text-xs sm:text-sm truncate">{product.throughput}</p>
              </div>
            )}
            {product.price && (
              <div className="bg-emerald-50/70 rounded-xl p-2.5 sm:p-3 border border-emerald-100">
                <p className="text-[11px] uppercase tracking-wider text-emerald-600 font-semibold">Price</p>
                <p className="font-bold text-emerald-700 mt-0.5 text-xs sm:text-sm truncate">₹{product.price}</p>
              </div>
            )}
            {!product.price && product.category && (
              <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Category</p>
                <p className="font-semibold text-slate-800 mt-0.5 text-xs sm:text-sm truncate">{product.category}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center lg:justify-end">
          <Link
            href={linkHref}
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-sky-700 !text-white font-semibold hover:bg-sky-800 shadow-sm hover:shadow transition"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
