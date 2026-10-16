import { NextResponse } from "next/server";
import { fetchAdminCatalog, COMPANY_ID, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    const catalog = await fetchAdminCatalog({
      companyId: COMPANY_ID,
      websiteId: WEBSITE_ID,
      forceRefresh,
    });

    return NextResponse.json(
      {
        products: catalog.products || [],
        categories: catalog.categories || [],
        categoryProducts: catalog.categoryProducts || [],
        normalProducts: catalog.normalProducts || [],
        total: catalog.total || (catalog.products ? catalog.products.length : 0),
        source: "mongodb_master",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("[catalog-api] Unexpected error:", error);
    return NextResponse.json(
      {
        products: [],
        categories: [],
        categoryProducts: [],
        normalProducts: [],
        total: 0,
        error: error.message,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
