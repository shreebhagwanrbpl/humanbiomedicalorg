import Home from "../page";
export async function generateMetadata({
  params,
}) {
  const { district } =
    await params;

  const city = district
    .replace(/-/g, " ")
    .replace(
      /\b\w/g,
      (c) =>
        c.toUpperCase()
    );

  const title =
    `Biomedical Equipment Supplier in ${city} | Human Biomedical`;

  const description =
    `Human Biomedical supplies CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers and laboratory equipment in ${city}.`;

  const url =
    `https://humanbiomedical.org/${district}`;

  return {
    title,
    description,

    keywords: [
      `Biomedical Equipment Supplier in ${city}`,
      `Laboratory Equipment Supplier in ${city}`,
      `CBC Machine Supplier in ${city}`,
      `Hematology Analyzer Supplier in ${city}`,
      `Biochemistry Analyzer Supplier in ${city}`,
      city,
      "Human Biomedical",
    ],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName:
        "Human Biomedical",
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card:
        "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
export default async function DistrictPage({
  params,
}) {
  const resolvedParams = await params;

  const district =
    resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );

  return <Home city={city} />;
}