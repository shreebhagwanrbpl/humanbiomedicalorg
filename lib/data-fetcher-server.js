import { cache } from "react";
import {
  fetchAdminCatalog,
  fetchAdminSiteData,
  COMPANY_ID,
  COMPANY_NAME,
  CURRENT_SITE,
  WEBSITE_ID,
  makeSlug,
  isItemVisibleOnWebsite,
  normalizeProduct,
} from "./admin-api.js";
import { getProductBySlugFromMongo } from "./mongodb.js";

export {
  COMPANY_ID,
  COMPANY_NAME,
  CURRENT_SITE,
  WEBSITE_ID,
  makeSlug,
  isItemVisibleOnWebsite,
  normalizeProduct,
  fetchAdminSiteData,
};

export const fetchFullCatalog = cache(async function fetchFullCatalog(forceRefresh = false) {
  try {
    const catalog = await fetchAdminCatalog({
      companyId: COMPANY_ID,
      websiteId: WEBSITE_ID,
      forceRefresh,
    });

    const list = Array.isArray(catalog.products) ? catalog.products : [];
    list.categories = catalog.categories || [];
    list.products = list;
    list.categoryProducts = catalog.categoryProducts || list;
    list.normalProducts = catalog.normalProducts || [];

    return list;
  } catch (err) {
    console.error("[data-fetcher-server] Error fetching catalog:", err);
    const empty = [];
    empty.categories = [];
    empty.products = [];
    empty.categoryProducts = [];
    empty.normalProducts = [];
    return empty;
  }
});

export const fetchProductBySlug = cache(async function fetchProductBySlug(slug) {
  if (!slug) return null;
  const searchSlug = String(slug).toLowerCase().trim();

  // 1. Direct fast MongoDB lookup
  try {
    const mongoProd = await getProductBySlugFromMongo(slug, WEBSITE_ID);
    if (mongoProd) return mongoProd;
  } catch (err) {
    console.warn("[data-fetcher-server] MongoDB slug lookup error:", err.message);
  }

  // 2. Fallback to catalog lookup
  const catalog = await fetchFullCatalog();
  const productList = Array.isArray(catalog) ? catalog : (catalog.products || []);

  return (
    productList.find((p) => {
      const pSlug = String(p.slug || "").toLowerCase().trim();
      const pTitleSlug = makeSlug(p.title || p.name);
      const pId = String(p.id || "").toLowerCase().trim();
      const pUid = String(p.uid || "").toLowerCase().trim();
      const pCatProdId = String(p.categoryProductId || "").toLowerCase().trim();

      return (
        pSlug === searchSlug ||
        pTitleSlug === searchSlug ||
        pId === searchSlug ||
        pUid === searchSlug ||
        pCatProdId === searchSlug
      );
    }) || null
  );
});

export async function fetchCategories() {
  const catalog = await fetchFullCatalog();
  return catalog.categories || [];
}

export async function fetchItemBySlug(slug) {
  return fetchProductBySlug(slug);
}
