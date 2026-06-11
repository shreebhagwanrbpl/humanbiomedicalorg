import ItemsPage from "@/app/items/page";

export default async function DistrictItemsPage({
  params,
}) {
  const { district } =
    await params;

  const city = district
    ?.replace(/-/g, " ")
    ?.replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );

  return (
    <ItemsPage city={city} />
  );
}