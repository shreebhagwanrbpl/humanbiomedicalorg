import { NextResponse } from "next/server";
import { submitAdminProductQuery, COMPANY_ID, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, productName, productSlug, brand, model, district, message } = body;

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
      district: (district || "").trim(),
      message: (message || "").trim(),
      companyId: COMPANY_ID,
      websiteId: WEBSITE_ID,
      createdAt: new Date().toISOString(),
      source: "website_product_enquiry",
    };

    // Save to MongoDB Atlas queries collection and forward to SuperAdmin API
    const result = await submitAdminProductQuery(payload);

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully. Our biomedical specialist will contact you soon.",
      data: result.data || null,
    });
  } catch (error) {
    console.error("[product-query] Error submitting query:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while submitting your enquiry. Please try again." },
      { status: 500 }
    );
  }
}
