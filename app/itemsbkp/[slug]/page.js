import ProductDetails from "./ProductDetails";
import { fetchProductBySlug } from "@/lib/data-fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const product = await fetchProductBySlug(slug);

        if (!product) {
            return {
                title: "Human Biomedical",
            };
        }

        const title = `${product.title} Supplier in India | Human Biomedical`;
        const description =
            (product.description || product.desc)?.slice(0, 160) ||
            `Buy ${product.title} from Human Biomedical. Trusted supplier of biomedical and laboratory equipment across India.`;

        return {
            title,
            description,
            keywords: [
                product.title,
                `${product.title} Supplier`,
                `${product.title} Dealer`,
                `${product.title} Price`,
                "Biomedical Equipment",
                "Laboratory Equipment",
                "Medical Equipment",
                "Human Biomedical",
            ],
            alternates: {
                canonical: `https://humanbiomedical.org/items/${slug}`,
            },
            openGraph: {
                title,
                description,
                url: `https://humanbiomedical.org/items/${slug}`,
                siteName: "Human Biomedical",
                type: "website",
                images: [
                    {
                        url: product.image || product.images?.[0] || "/humanlogo.png",
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
                images: [product.image || product.images?.[0] || "/humanlogo.png"],
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch {
        return {
            title: "Human Biomedical",
        };
    }
}

export default async function Page({ params }) {
    const { slug } = await params;
    return <ProductDetails slug={slug} />;
}