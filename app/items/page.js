import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";

export const revalidate = 60;

export const metadata = {
  title: "Biomedical & Laboratory Equipment Catalog | Human Biomedical",
  description:
    "Explore our complete range of clinical biochemistry analyzers, hematology analyzers, CBC machines, ELISA systems, and diagnostic laboratory equipment across India.",
  keywords: [
    "Biomedical Equipment Catalog",
    "Clinical Laboratory Analyzers",
    "Hematology Analyzers India",
    "Biochemistry Analyzers",
    "ELISA Reader Price",
    "CBC Machine Suppliers",
    "Diagnostic Equipment Price List",
    "Human Biomedical Catalog",
  ],
  alternates: {
    canonical: "https://humanbiomedical.org/items",
  },
  openGraph: {
    title: "Biomedical & Laboratory Equipment Catalog | Human Biomedical",
    description:
      "Explore clinical biochemistry analyzers, hematology systems, and diagnostic laboratory equipment at best prices in India.",
    url: "https://humanbiomedical.org/items",
    siteName: "Human Biomedical",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/humanlogo.png",
        width: 1200,
        height: 630,
        alt: "Human Biomedical Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biomedical & Laboratory Equipment Catalog | Human Biomedical",
    description: "Explore clinical biochemistry analyzers and diagnostic equipment across India.",
    images: ["/humanlogo.png"],
  },
};

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full dynamic catalog from MongoDB / Superadmin
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}