import {
  COMPANY_ID,
  COMPANY_NAME,
  WEBSITE_ID,
  CURRENT_SITE,
  makeSlug,
  isItemVisibleOnWebsite,
  normalizeProduct,
} from "./catalog-utils.js";
import {
  getMasterCatalogFromMongo,
  getProductBySlugFromMongo,
  insertQueryToMongo,
  getSiteDataFromMongo,
} from "./mongodb.js";

export const ADMIN_API_BASE_URL =
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  process.env.NEXT_PUBLIC_ADMIN_API_URL ||
  "https://admin.rajbiosis.app";

export {
  COMPANY_ID,
  COMPANY_NAME,
  WEBSITE_ID,
  CURRENT_SITE,
  makeSlug,
  isItemVisibleOnWebsite,
  normalizeProduct,
  formatProduct,
};

export function getCompanyAndWebsiteConfig() {
  return {
    companyId: COMPANY_ID,
    companyName: COMPANY_NAME,
    websiteId: WEBSITE_ID,
    currentSite: CURRENT_SITE,
  };
}

export function formatProduct(p, catName = "", subName = "") {
  return normalizeProduct(p, catName, subName);
}

export function getAdminApiUrl(endpoint = "") {
  const base = ADMIN_API_BASE_URL.replace(/\/+$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

// Persistent in-memory catalog cache for server runtime (10 minutes TTL)
const CACHE_TTL = 10 * 60 * 1000;

/**
 * Fetch catalog directly from MongoDB (Primary) or SuperAdmin API (Fallback)
 */
export async function fetchAdminCatalog({
  companyId = COMPANY_ID,
  websiteId = WEBSITE_ID,
  forceRefresh = false,
} = {}) {
  const now = Date.now();
  if (
    !forceRefresh &&
    global._adminApiCatalogCache &&
    now - (global._adminApiCatalogCacheTime || 0) < CACHE_TTL
  ) {
    return global._adminApiCatalogCache;
  }

  // 1. Try fetching directly from MongoDB Atlas (Fastest & most direct)
  try {
    const mongoCatalog = await getMasterCatalogFromMongo(websiteId);
    if (mongoCatalog && Array.isArray(mongoCatalog.products) && mongoCatalog.products.length > 0) {
      global._adminApiCatalogCache = mongoCatalog;
      global._adminApiCatalogCacheTime = now;
      return mongoCatalog;
    }
  } catch (mongoErr) {
    console.warn("[admin-api] Direct MongoDB catalog fetch error:", mongoErr.message);
  }

  // 2. Fallback to SuperAdmin API
  const url = getAdminApiUrl(
    `/api/catalog/?companyId=${encodeURIComponent(companyId)}&websiteId=${encodeURIComponent(websiteId)}`
  );

  try {
    const res = await fetch(url, {
      cache: forceRefresh ? "no-store" : "default",
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.warn(`[admin-api] Superadmin API responded with status ${res.status}`);
      return { products: [], categories: [], categoryProducts: [], normalProducts: [], total: 0 };
    }

    const data = await res.json();
    let rawProducts = [];
    let rawCategories = [];

    if (Array.isArray(data.products)) {
      rawProducts = data.products;
    } else if (Array.isArray(data.data)) {
      rawProducts = data.data;
    } else if (Array.isArray(data)) {
      rawProducts = data;
    }

    if (Array.isArray(data.categories)) {
      rawCategories = data.categories;
    }

    const visibleProducts = rawProducts
      .filter((p) => isItemVisibleOnWebsite(p, websiteId))
      .map((p, idx) => normalizeProduct(p, "", "", idx))
      .filter(Boolean);

    const categoryMap = new Map();
    for (const cat of rawCategories) {
      if (isItemVisibleOnWebsite(cat, websiteId)) {
        categoryMap.set(cat.id || cat.name || cat.slug, cat);
      }
    }

    const result = {
      products: visibleProducts,
      categories: Array.from(categoryMap.values()),
      categoryProducts: visibleProducts,
      normalProducts: visibleProducts.filter((p) => p.type !== "category"),
      total: visibleProducts.length,
      totalCount: visibleProducts.length,
    };

    serverCatalogCache = result;
    serverCatalogCacheTime = now;
    return result;
  } catch (err) {
    console.warn("[admin-api] Superadmin catalog fetch failed:", err.message);
    return { products: [], categories: [], categoryProducts: [], normalProducts: [], total: 0 };
  }
}

/**
 * Fetch dynamic site data from MongoDB or SuperAdmin API
 */
export async function fetchAdminSiteData({
  type = "page",
  page = "home",
  district = "",
  websiteId = WEBSITE_ID,
  companyId = COMPANY_ID,
} = {}) {
  // 1. Try MongoDB
  try {
    const mongoData = await getSiteDataFromMongo({ type, page, district, websiteId });
    if (mongoData && mongoData.data) {
      return mongoData;
    }
  } catch (mErr) {
    // Continue to API
  }

  // 2. Fallback to SuperAdmin API
  const params = new URLSearchParams({
    companyId,
    websiteId,
    type,
  });

  if (page) params.append("page", page);
  if (district) params.append("district", district);

  const url = getAdminApiUrl(`/api/site-data/?${params.toString()}`);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return json;
      }
    }

    return { success: true, data: null };
  } catch (err) {
    console.warn(`[admin-api] Superadmin site-data (${type}/${page}) fetch failed:`, err.message);
    return { success: false, data: null, error: err.message };
  }
}

/**
 * Submit Contact Query to MongoDB AND SuperAdmin API
 */
export async function submitAdminContactQuery(payload) {
  let mongoSaved = false;
  let mongoResult = null;

  // 1. Save directly to MongoDB Atlas `queries` collection
  try {
    mongoResult = await insertQueryToMongo({
      type: "contact",
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message,
      district: payload.district || "",
      websiteId: payload.websiteId || WEBSITE_ID,
    });
    mongoSaved = true;
  } catch (mErr) {
    console.error("[admin-api] MongoDB contact query save failed:", mErr.message);
  }

  // 2. Forward to SuperAdmin API
  const url = getAdminApiUrl("/api/contact-query/");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: true, data, mongoSaved, mongoResult };
  } catch (err) {
    console.warn("[admin-api] Superadmin contact-query forwarding:", err.message);
    return { ok: mongoSaved, data: mongoResult, mongoSaved };
  }
}

/**
 * Submit Product Enquiry to MongoDB AND SuperAdmin API
 */
export async function submitAdminProductQuery(payload) {
  let mongoSaved = false;
  let mongoResult = null;

  // 1. Save directly to MongoDB Atlas `queries` collection
  try {
    mongoResult = await insertQueryToMongo({
      type: "product",
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      productName: payload.productName || "",
      productSlug: payload.productSlug || "",
      brand: payload.brand || "",
      model: payload.model || "",
      district: payload.district || "",
      subject: `Enquiry for ${payload.productName || "Product"}`,
      message: payload.message || `Customer enquiry for ${payload.productName || "product"}.`,
      websiteId: payload.websiteId || WEBSITE_ID,
    });
    mongoSaved = true;
  } catch (mErr) {
    console.error("[admin-api] MongoDB product query save failed:", mErr.message);
  }

  // 2. Forward to SuperAdmin API
  const url = getAdminApiUrl("/api/product-query/");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: true, data, mongoSaved, mongoResult };
  } catch (err) {
    console.warn("[admin-api] Superadmin product-query forwarding:", err.message);
    return { ok: mongoSaved, data: mongoResult, mongoSaved };
  }
}
