import { NextResponse } from "next/server";
import { submitAdminContactQuery, COMPANY_ID, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, district } = body;

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
      subject: (subject || "General Inquiry").trim(),
      message: (message || "").trim(),
      district: (district || "").trim(),
      companyId: COMPANY_ID,
      websiteId: WEBSITE_ID,
      createdAt: new Date().toISOString(),
      source: "website_contact_form",
    };

    // Forward query to MongoDB and SuperAdmin API
    const result = await submitAdminContactQuery(payload);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. Our team will contact you shortly.",
      data: result.data || null,
    });
  } catch (error) {
    console.error("[contact-query] Error processing query:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while sending your message. Please try again." },
      { status: 500 }
    );
  }
}
