import { fetchFullCatalog as fetchFullCatalogRaw } from "./data-fetcher";

export const fetchFullCatalog = async () => {
  return await fetchFullCatalogRaw(true);
};

export * from "./data-fetcher";
