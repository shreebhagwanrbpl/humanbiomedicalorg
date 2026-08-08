import ProductDetails from "@/app/items/[slug]/ProductDetails";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export async function generateMetadata({
    params,
}) {
    const { district, slug } =
        await params;

    const city = district
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) =>
            c.toUpperCase()
        );

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

        const product = products.find((item) => {
            const generatedSlug =
                item.title
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "");

            return generatedSlug === slug;
        });

        if (!product) {
            return {
                title: "Product Not Found",
            };
        }

        const title =
            `${product.title} Supplier in ${city} | Human Biomedical`;

        const description =
            `Buy ${product.title} in ${city}. Best price, installation, support and biomedical equipment supplier in ${city}. Contact Human Biomedical for ${product.title} and healthcare solutions.`;

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

        const url =
            `https://humanbiomedical.org/${district}/items/${slug}`;

        return {
            title,
            description,
            keywords,

            authors: [
                {
                    name: "Human Biomedical",
                },
            ],

            creator:
                "Human Biomedical",

            publisher:
                "Human Biomedical",

            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-image-preview":
                        "large",
                    "max-snippet": -1,
                    "max-video-preview":
                        -1,
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
                        url:
                            product.image ||
                            product.images?.[0] ||
                            "/humanlogo.png",
                        width: 1200,
                        height: 630,
                        alt: product.title,
                    },
                ],
            },

            twitter: {
                card:
                    "summary_large_image",
                title,
                description,
                images: [
                    product.image ||
                    product.images?.[0] ||
                    "/humanlogo.png",
                ],
            },
        };
    } catch (error) {
        return {
            title:
                "Human Biomedical",
        };
    }
}
// export async function generateMetadata({
//     params,
// }) {
//     const { district, slug } =
//         await params;

//     const city = district
//         .replace(/-/g, " ")
//         .replace(/\b\w/g, (c) =>
//             c.toUpperCase()
//         );

//     try {
//         const snap = await getDoc(
//             doc(
//                 db,
//                 "websites",
//                 "humanbiomedicalorg",
//                 "pages",
//                 "products"
//             )
//         );

//         const products =
//             snap.data()?.products || [];

//         const product =
//             products.find(
//                 (item) =>
//                     item.slug === slug
//             );

//         if (!product) {
//             return {
//                 title:
//                     "Product Not Found",
//             };
//         }

//         const description =
//             product.description?.slice(
//                 0,
//                 160
//             ) ||
//             "Biomedical equipment and healthcare solutions.";

//         return {
//             title: `${product.title} in ${city}`,

//             description,

//             alternates: {
//                 canonical:
//                     `https://humanbiomedical.org/${district}/items/${slug}`,
//             },

//             openGraph: {
//                 title: `${product.title} in ${city}`,
//                 description,
//                 url:
//                     `https://humanbiomedical.org/${district}/items/${slug}`,
//                 type: "website",
//                 images: [
//                     {
//                         url:
//                             product.image,
//                     },
//                 ],
//             },

//             twitter: {
//                 card:
//                     "summary_large_image",
//                 title: `${product.title} in ${city}`,
//                 description,
//                 images: [
//                     product.image,
//                 ],
//             },
//         };
//     } catch (error) {
//         console.error(error);

//         return {
//             title:
//                 "Human Biomedical",
//         };
//     }
// }

export default async function Page({
    params,
}) {
    const { district, slug } =
        await params;

    const city = district
        .replace(/-/g, " ")
        .replace(
            /\b\w/g,
            (char) =>
                char.toUpperCase()
        );

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

    const product = products.find((item) => {
        const generatedSlug =
            item.title
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "");

        return generatedSlug === slug;
    });

    const schema = product
        ? {
            "@context": "https://schema.org",
            "@type": "Product",

            name: product.title || "",

            image:
                product.image ||
                product.images?.[0] ||
                "",

            description:
                product.description ||
                product.desc ||
                "",

            sku: slug,

            url: `https://humanbiomedical.org/${district}/items/${slug}`,

            brand: {
                "@type": "Brand",
                name: "Human Biomedical",
            },

            offers: {
                "@type": "Offer",
                availability:
                    "https://schema.org/InStock",
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
                        __html:
                            JSON.stringify(
                                schema
                            ),
                    }}
                />
            )}

            <Navbar city={city} />
            <ProductDetails
                slug={slug}
                city={city}
            />
            <Footer city={city} />
        </>
    );
}