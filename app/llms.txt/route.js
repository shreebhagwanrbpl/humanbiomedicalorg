import { NextResponse } from "next/server";
import { fetchAdminCatalog, fetchAdminSiteData, WEBSITE_ID } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DOMAIN = "https://humanbiomedical.org";

export async function GET() {
    try {
        // Districts
        const districtRes = await fetchAdminSiteData({ type: "districts" });
        const rawDistricts = districtRes?.districts || districtRes?.data || [];
        const districts = Array.isArray(rawDistricts) ? rawDistricts : [];

        // Catalog
        const catalog = await fetchAdminCatalog();
        const products = Array.isArray(catalog.products) ? catalog.products : [];
        const categories = Array.isArray(catalog.categories) ? catalog.categories : [];

        const publishedProducts = products.filter(
            (item) => item.isPublished !== false && item.status !== "inactive"
        );

        // ===========================
        // Categories
        // ===========================
        const categoryText =
            categories.length > 0
                ? categories
                    .map((cat) => {
                        const productList =
                            (cat.products || [])
                                .map((item) => `- ${item.title || item.name}`)
                                .join("\n");

                        return `
## ${cat.name || cat.category || cat.id}

Category ID:
${cat.id}

Total Products:
${cat.products?.length || 0}

Products:
${productList || "No Products"}
`;
                    })
                    .join("\n")
                : "No Categories Found";

        // ===========================
        // Products
        // ===========================
        const productText =
            publishedProducts.length > 0
                ? publishedProducts
                    .map((product) => {
                        return `
# ${product.title || product.name}

Category:
${product.category || "N/A"}

Brand:
${product.brand || "N/A"}

Model:
${product.model || "N/A"}

Description:
${product.desc || product.description || "No description available"}

Instrument:
${product.instrument || "N/A"}

Automation:
${product.automation || "N/A"}

Usage:
${product.usage || "N/A"}

Throughput:
${product.throughput || "N/A"}

Capacity:
${product.capacity || "N/A"}

Availability:
${product.availability || "N/A"}

Price:
${product.price || "Contact for Price"}

Product URL:
${DOMAIN}/items/${product.slug || product.id}

${[
    product.title || product.name,
    product.brand,
    product.category,
    product.model,
    product.instrument,
    product.automation,
    product.usage,
]
    .filter(Boolean)
    .join(", ")}
`;
                    })
                    .join("\n")
                : "No Products Found";

        // ===========================
        // Districts
        // ===========================
        const districtText =
            districts.length > 0
                ? districts
                    .map((item) => `${DOMAIN}/${item.slug}`)
                    .join("\n")
                : "No Districts Found";

        // ===========================
        // llms.txt content
        // ===========================
        const content = `
## Statistics

Products:
${publishedProducts.length}

Categories:
${categories.length}

Districts:
${districts.length}

# Human Biomedical

India's Trusted Biomedical Equipment Company

Website:
${DOMAIN}

Published Products:
${publishedProducts.length}

Categories:
${categories.length}

District Pages:
${districts.length}

Company:
Human Biomedical is one of India's trusted Biomedical Equipment suppliers.

Services:
- Biomedical Equipment Supply
- Laboratory Equipment
- Diagnostic Equipment
- Installation
- AMC
- Calibration
- Repair
- Technical Support
- Pan India Delivery

Search Keywords:
Biomedical Equipment, Laboratory Equipment, Diagnostic Equipment, Hospital Equipment, Medical Equipment, ICU Equipment, Operation Theatre Equipment, Biochemistry Analyzer, Electrolyte Analyzer, CLIA Analyzer, Immunoassay Analyzer

------------------------------------------------

## Categories

${categoryText}

------------------------------------------------

## Products

${productText}

------------------------------------------------

## District Pages

${districtText}

------------------------------------------------

Sitemap:
${DOMAIN}/sitemap.xml

Robots:
${DOMAIN}/robots.txt

Contact:
${DOMAIN}/contact

Last Updated:
${new Date().toISOString()}
`;

        return new NextResponse(content, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "public,max-age=3600",
            },
        });
    } catch (e) {
        return NextResponse.json(
            {
                success: false,
                error: e.message,
            },
            {
                status: 500,
            }
        );
    }
}