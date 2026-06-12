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
            title: `${product.title}`,

            description:
                product.description?.slice(
                    0,
                    160
                ) ||
                "Biomedical equipment and healthcare solutions.",

            alternates: {
                canonical:
                    `https://humanbiomedical.com/items/${slug}`,
            },

            openGraph: {
                title: product.title,
                description:
                    product.description?.slice(
                        0,
                        160
                    ),
                images: [
                    {
                        url: product.image,
                    },
                ],
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