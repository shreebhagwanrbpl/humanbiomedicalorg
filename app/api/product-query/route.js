import { NextResponse } from "next/server";
import { submitAdminProductQuery, COMPANY_ID, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, productName, productSlug, brand, model } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 });
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      productName: (productName || "").trim(),
      productSlug: (productSlug || "").trim(),
      brand: (brand || "").trim(),
      model: (model || "").trim(),
      companyId: COMPANY_ID,
      websiteId: WEBSITE_ID,
      createdAt: new Date().toISOString(),
      source: "website_product_enquiry",
    };

    // Forward to SQLite Admin API
    const adminResult = await submitAdminProductQuery(payload);

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      data: adminResult.data || null,
    });
  } catch (error) {
    console.error("[product-query] Error submitting query:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while submitting your enquiry." },
      { status: 500 }
    );
  }
}
