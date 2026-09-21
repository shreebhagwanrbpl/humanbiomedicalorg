import ProductDetails from "@/app/items/[slug]/ProductDetails";
import { fetchProductBySlug } from "@/lib/data-fetcher";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
    const { district, slug } = await params;

    const city = district
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    const product = await fetchProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found | Human Biomedical",
            description: "The requested product is unavailable or not found in our catalog.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = `${product.title} Supplier in ${city} | Human Biomedical`;
    const description = `Buy ${product.title} in ${city}. Best price, installation, support and biomedical equipment supplier in ${city}. Contact Human Biomedical for ${product.title} and healthcare solutions.`;

    const keywords = [
        product.title,
        `${product.title} in ${city}`,
        `Buy ${product.title} in ${city}`,
        `${product.title} supplier in ${city}`,
        `${product.title} dealer in ${city}`,
        `${product.title} distributor in ${city}`,
        `${product.title} price in ${city}`,
        `Biomedical Equipment ${city}`,
        `Medical Equipment ${city}`,
        `Hospital Equipment ${city}`,
        `Healthcare Equipment ${city}`,
        "Human Biomedical",
        "Biomedical Equipment India",
        "Medical Equipment Supplier India",
    ];

    const url = `https://humanbiomedical.org/${district}/items/${slug}`;
    const image = product.image || product.images?.[0] || "/humanlogo.png";

    return {
        title,
        description,
        keywords,
        authors: [{ name: "Human Biomedical" }],
        creator: "Human Biomedical",
        publisher: "Human Biomedical",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Human Biomedical",
            locale: "en_IN",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}

export default async function Page({ params }) {
    const { district, slug } = await params;

    const city = district
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    const product = await fetchProductBySlug(slug);

    const schema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title || "",
            image: product.image || product.images?.[0] || "",
            description: product.description || product.desc || "",
            sku: slug,
            url: `https://humanbiomedical.org/${district}/items/${slug}`,
            brand: {
                "@type": "Brand",
                name: "Human Biomedical",
            },
            offers: {
                "@type": "Offer",
                availability: "https://schema.org/InStock",
                priceCurrency: "INR",
            },
        }
        : null;

    return (
        <>
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema),
                    }}
                />
            )}

            <Navbar city={city} />
            <ProductDetails
                slug={slug}
                product={product}
                city={city}
            />
        </>
    );
}