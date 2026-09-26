import { fetchFullCatalog } from "@/lib/data-fetcher";
import { fetchAdminSiteData } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap() {
    const baseUrl = "https://humanbiomedical.org";
    const urls = [];

    // Static pages
    urls.push(
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/items`,
            lastModified: new Date(),
        }
    );

    // Districts & Products
    try {
        const districtsRes = await fetchAdminSiteData({ type: "districts" });
        const rawDistricts = districtsRes?.districts || districtsRes?.data || [];
        const districts = Array.isArray(rawDistricts) ? rawDistricts : [];

        districts.forEach((district) => {
            const slug = district.slug;
            if (!slug) return;

            urls.push(
                {
                    url: `${baseUrl}/${slug}`,
                    lastModified: new Date(),
                },
                {
                    url: `${baseUrl}/${slug}/about`,
                    lastModified: new Date(),
                },
                {
                    url: `${baseUrl}/${slug}/services`,
                    lastModified: new Date(),
                },
                {
                    url: `${baseUrl}/${slug}/contact`,
                    lastModified: new Date(),
                },
                {
                    url: `${baseUrl}/${slug}/items`,
                    lastModified: new Date(),
                }
            );
        });

        // Products from Master Catalog
        const products = await fetchFullCatalog();
        const productList = Array.isArray(products) ? products : (products.products || []);

        productList.forEach((product) => {
            if (!product.slug) return;

            urls.push({
                url: `${baseUrl}/items/${product.slug}`,
                lastModified: new Date(),
            });

            districts.forEach((district) => {
                if (!district.slug) return;
                urls.push({
                    url: `${baseUrl}/${district.slug}/items/${product.slug}`,
                    lastModified: new Date(),
                });
            });
        });
    } catch (err) {
        console.warn("[sitemap] Error building sitemap:", err.message);
    }

    return urls;
}