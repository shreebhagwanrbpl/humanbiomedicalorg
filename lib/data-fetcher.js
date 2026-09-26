import {
  fetchAdminCatalog,
  fetchAdminSiteData,
  formatProduct,
  isItemVisibleOnWebsite,
  COMPANY_ID,
  COMPANY_NAME,
  CURRENT_SITE,
  WEBSITE_ID,
  makeSlug,
} from "./admin-api.js";

export {
  COMPANY_ID,
  COMPANY_NAME,
  CURRENT_SITE,
  WEBSITE_ID,
  makeSlug,
  formatProduct,
  isItemVisibleOnWebsite,
  fetchAdminSiteData,
};

/**
 * Backward compatible helper for product visibility
 */
export function isProductVisibleOnCurrentSite(prod) {
  return isItemVisibleOnWebsite(prod, CURRENT_SITE);
}

/**
 * Backward compatible helper for category visibility
 */
export function isCategoryVisibleOnCurrentSite(cat) {
  return isItemVisibleOnWebsite(cat, CURRENT_SITE);
}

/**
 * Fetch and process the entire products catalog from SQLite Admin API.
 * In browser: fetches from /api/catalog
 * On server: reads directly from SQLite Admin API
 */
export async function fetchFullCatalog(forceRefresh = false) {
  // 1. In browser environment: fetch from Route Handler /api/catalog
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/catalog", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data.products) ? data.products : [];
        list.categories = data.categories || [];
        list.products = list;
        list.categoryProducts = data.categoryProducts || [];
        list.normalProducts = data.normalProducts || [];
        return list;
      }
    } catch (clientErr) {
      console.warn("[data-fetcher] Browser fetch /api/catalog failed:", clientErr);
    }

    const emptyBrowserList = [];
    emptyBrowserList.categories = [];
    emptyBrowserList.products = [];
    emptyBrowserList.categoryProducts = [];
    emptyBrowserList.normalProducts = [];
    return emptyBrowserList;
  }

  // 2. Server environment: fetch from SQLite Admin API
  try {
    const catalog = await fetchAdminCatalog({
      companyId: COMPANY_ID,
      websiteId: WEBSITE_ID,
      forceRefresh: forceRefresh,
    });

    const list = Array.isArray(catalog.products) ? catalog.products : [];
    list.categories = catalog.categories || [];
    list.products = list;
    list.categoryProducts = catalog.categoryProducts || [];
    list.normalProducts = catalog.normalProducts || [];

    return list;
  } catch (err) {
    console.error("[data-fetcher] Error fetching SQLite Admin catalog:", err);
    const emptyArr = [];
    emptyArr.categories = [];
    emptyArr.products = [];
    emptyArr.categoryProducts = [];
    emptyArr.normalProducts = [];
    return emptyArr;
  }
}

/**
 * Fetch a single product by its slug (or ID).
 * Returns product ONLY IF it is visible on humanbiomedicalorg.
 */
export async function fetchProductBySlug(slug) {
  if (!slug) return null;
  const catalog = await fetchFullCatalog();
  const searchSlug = String(slug).toLowerCase().trim();
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
}

/**
 * Fetch categories list
 */
export async function fetchCategories() {
  const catalog = await fetchFullCatalog();
  return catalog.categories || [];
}

export async function fetchItemBySlug(slug) {
  return fetchProductBySlug(slug);
}

export function clearItemsCatalogCache() {
  // No-op for real-time dynamic rendering
}
