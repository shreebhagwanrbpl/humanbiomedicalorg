import Navbar from "@/components/Navbar";

export default function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <Navbar />

      {/* Breadcrumb Skeleton */}
      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          <span className="text-slate-300">/</span>
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
          <span className="text-slate-300">/</span>
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Image Gallery Skeleton */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100" />
              <div className="mt-4 flex gap-3">
                <div className="h-20 w-20 animate-pulse rounded-xl bg-slate-200" />
                <div className="h-20 w-20 animate-pulse rounded-xl bg-slate-200" />
                <div className="h-20 w-20 animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          </div>

          {/* Right Column: Product Info Skeleton */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
              {/* Category Badge */}
              <div className="h-6 w-28 animate-pulse rounded-full bg-blue-100" />

              {/* Title */}
              <div className="mt-4 h-9 w-3/4 animate-pulse rounded-lg bg-slate-200" />
              <div className="mt-2 h-7 w-1/2 animate-pulse rounded-lg bg-slate-200" />

              {/* Description */}
              <div className="mt-6 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200" />
              </div>

              {/* Specs Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-slate-100 py-6">
                <div>
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="mt-1 h-5 w-28 animate-pulse rounded bg-slate-300" />
                </div>
                <div>
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="mt-1 h-5 w-28 animate-pulse rounded bg-slate-300" />
                </div>
                <div>
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="mt-1 h-5 w-28 animate-pulse rounded bg-slate-300" />
                </div>
                <div>
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="mt-1 h-5 w-28 animate-pulse rounded bg-slate-300" />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="h-12 w-44 animate-pulse rounded-xl bg-blue-600/70" />
                <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
