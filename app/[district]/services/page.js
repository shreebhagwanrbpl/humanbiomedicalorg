import Services from "@/app/services/page";

export default async function DistrictServicesPage({
  params,
}) {
  const { district } = await params;

  const city = district
    ?.replace(/-/g, " ")
    ?.replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );

  return <Services city={city} />;
}