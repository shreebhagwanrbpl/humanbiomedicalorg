import { NextResponse } from "next/server";
import { fetchAdminCatalog, COMPANY_ID, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  try {
    const catalog = await fetchAdminCatalog({
      companyId: COMPANY_ID,
      websiteId: WEBSITE_ID,
      forceRefresh: true,
    });

    return NextResponse.json(
      {
        products: catalog.products || [],
        categories: catalog.categories || [],
        categoryProducts: catalog.categoryProducts || [],
        normalProducts: catalog.normalProducts || [],
        total: catalog.total || (catalog.products ? catalog.products.length : 0),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
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
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  }
}
