import Navbar from "@/components/Navbar";

export default function ProductsListLoading() {
  return (
    <div className="min-h-screen bg-[#fafbfe]">
      <Navbar />

      {/* Hero Header Skeleton */}
      <div className="border-b border-slate-200/80 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-10 w-80 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded bg-slate-100" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-4">
              <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="space-y-2">
                <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
                <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
                <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
                <div className="h-8 w-full animate-pulse rounded-lg bg-slate-100" />
              </div>
            </div>
          </div>

          {/* Product Cards Grid Skeleton */}
          <div className="lg:col-span-3 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <div className="h-44 w-full sm:w-52 shrink-0 animate-pulse rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                  </div>
                  <div className="pt-2">
                    <div className="h-10 w-36 animate-pulse rounded-lg bg-blue-600/70" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
