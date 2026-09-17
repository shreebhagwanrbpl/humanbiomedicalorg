import ProductDetails from "./ProductDetails";
import { fetchProductBySlug } from "@/lib/data-fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
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

  const productName = product.title || product.name || slug
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${productName} Supplier in India | Price, Dealer & Distributor | Human Biomedical`;
  const description = `Buy ${productName} at best price in India. Trusted supplier, dealer and distributor of ${productName} for hospitals, laboratories, diagnostic centers, research institutes and healthcare facilities. Contact Human Biomedical for latest quotation and product details.`;
  const url = `https://humanbiomedical.org/items/${slug}`;
  const image = product.image || (product.images?.length > 0 ? product.images[0] : "/humanlogo.png");

  return {
    title,
    description,
    keywords: [
      productName,
      `${productName} Supplier`,
      `${productName} Dealer`,
      `${productName} Distributor`,
      `${productName} Manufacturer`,
      `${productName} Exporter`,
      `${productName} Price`,
      `${productName} Price in India`,
      `${productName} Supplier in India`,
      `${productName} Dealer in India`,
      `${productName} Distributor in India`,
      `Buy ${productName}`,
      `${productName} for Laboratory`,
      `${productName} for Hospital`,
      `${productName} for Diagnostic Center`,
      "Biomedical Equipment",
      "Medical Equipment",
      "Laboratory Equipment",
      "Diagnostic Equipment",
      "Hospital Equipment",
      "Healthcare Equipment",
      "Human Biomedical",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Human Biomedical",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: new URL("https://humanbiomedical.org"),
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  return <ProductDetails slug={slug} product={product} />;
}