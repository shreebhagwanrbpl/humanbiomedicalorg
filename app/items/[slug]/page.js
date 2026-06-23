import ProductDetails from "./ProductDetails";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function generateMetadata({
    params,
}) {
    const { slug } = await params;

    try {
        const snap = await getDoc(
            doc(
                db,
                "websites",
                "humanbiomedicalorg",
                "pages",
                "products"
            )
        );

        const products =
            snap.data()?.products || [];

        const product =
            products.find(
                (item) =>
                    item.slug === slug
            );

        if (!product) {
            return {
                title:
                    "Human Biomedical",
            };
        }

        return {
            title: `${product.title} Supplier in India | Human Biomedical`,

            description:
                product.description?.slice(
                    0,
                    160
                ) ||
                `Buy ${product.title} from Human Biomedical. Trusted supplier of biomedical and laboratory equipment across India.`,

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
                canonical:
                    `https://humanbiomedical.org/items/${slug}`,
            },

            openGraph: {
                title:
                    `${product.title} Supplier in India | Human Biomedical`,
                description:
                    product.description?.slice(
                        0,
                        160
                    ),
                url:
                    `https://humanbiomedical.org/items/${slug}`,
                siteName:
                    "Human Biomedical",
                type: "website",
                images: [
                    {
                        url:
                            product.image,
                        width: 1200,
                        height: 630,
                        alt:
                            product.title,
                    },
                ],
            },

            twitter: {
                card:
                    "summary_large_image",
                title:
                    `${product.title} Supplier in India | Human Biomedical`,
                description:
                    product.description?.slice(
                        0,
                        160
                    ),
                images: [
                    product.image,
                ],
            },

            robots: {
                index: true,
                follow: true,
            },
        };
    } catch {
        return {
            title:
                "Human Biomedical",
        };
    }
}

export default async function Page({
    params,
}) {
    const { slug } =
        await params;

    return (
        <ProductDetails
            slug={slug}
        />
    );
}