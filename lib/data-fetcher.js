import {
  COMPANY_ID,
  COMPANY_NAME,
  CURRENT_SITE,
  WEBSITE_ID,
  makeSlug,
  isItemVisibleOnWebsite,
  normalizeProduct,
} from "./catalog-utils.js";

export {
  COMPANY_ID,
  COMPANY_NAME,
  CURRENT_SITE,
  WEBSITE_ID,
  makeSlug,
  isItemVisibleOnWebsite,
  normalizeProduct,
};

export function formatProduct(p, catName = "", subName = "") {
  return normalizeProduct(p, catName, subName);
}

export function isProductVisibleOnCurrentSite(prod) {
  return isItemVisibleOnWebsite(prod, CURRENT_SITE);
}

export function isCategoryVisibleOnCurrentSite(cat) {
  return isItemVisibleOnWebsite(cat, CURRENT_SITE);
}

// In-memory cache for client runtime
let clientCatalogCache = null;
let clientCatalogTime = 0;

/**
 * Client-safe fetcher for complete catalog.
 * Fetches from /api/catalog (which queries MongoDB & SuperAdmin securely on server).
 */
export async function fetchFullCatalog(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && clientCatalogCache && now - clientCatalogTime < 300000) {
    return clientCatalogCache;
  }

  try {
    const res = await fetch("/api/catalog", {
      cache: forceRefresh ? "no-store" : "default",
    });

    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data.products) ? data.products : [];
      list.categories = data.categories || [];
      list.products = list;
      list.categoryProducts = data.categoryProducts || list;
      list.normalProducts = data.normalProducts || [];
      clientCatalogCache = list;
      clientCatalogTime = now;
      return list;
    }
  } catch (err) {
    console.warn("[data-fetcher] Client catalog fetch failed:", err);
  }

  if (clientCatalogCache) return clientCatalogCache;

  const empty = [];
  empty.categories = [];
  empty.products = [];
  empty.categoryProducts = [];
  empty.normalProducts = [];
  return empty;
}

/**
 * Client-safe fetcher for product by slug.
 */
export async function fetchProductBySlug(slug) {
  if (!slug) return null;
  const searchSlug = String(slug).toLowerCase().trim();
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
}

export async function fetchCategories() {
  const catalog = await fetchFullCatalog();
  return catalog.categories || [];
}

export async function fetchItemBySlug(slug) {
  return fetchProductBySlug(slug);
}

export function clearItemsCatalogCache() {
  clientCatalogCache = null;
  clientCatalogTime = 0;
}
