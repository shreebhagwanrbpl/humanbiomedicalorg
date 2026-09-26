import { NextResponse } from "next/server";
import { fetchAdminSiteData, COMPANY_ID, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "page";
    const page = searchParams.get("page") || "home";
    const district = searchParams.get("district") || "";
    const companyId = searchParams.get("companyId") || COMPANY_ID;
    const websiteId = searchParams.get("websiteId") || WEBSITE_ID;

    const data = await fetchAdminSiteData({
      type,
      page,
      district,
      companyId,
      websiteId,
    });

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[site-data-route] Error fetching site data:", error);
    return NextResponse.json(
      { success: false, data: null, error: error.message },
      { status: 500 }
    );
  }
}
