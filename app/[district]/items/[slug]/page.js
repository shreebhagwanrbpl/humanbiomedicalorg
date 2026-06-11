import ItemsSlugPage from "@/app/items/[slug]/page";

export default async function Page({
    params,
}) {
    const { district, slug } = await params;

    const city = district
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );

    return (
        <ItemsSlugPage
            slug={slug}
            city={city}
        />
    );
}