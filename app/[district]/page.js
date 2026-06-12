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

  return {
    title:
      `Biomedical Equipment in ${city}`,
    description:
      `Advanced biomedical equipment and healthcare solutions in ${city}.`,
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