import Contact from "@/app/contact/page";

export default async function DistrictContactPage({
  params,
}) {
  const { district } = await params;

  const city = district
    ?.replace(/-/g, " ")
    ?.replace(
      /\b\w/g,
      (char) => char.toUpperCase()
    );

  return <Contact city={city} />;
}