import {
  COMPANY_ID,
  COMPANY_NAME,
  WEBSITE_ID,
  CURRENT_SITE,
  makeSlug,
  isItemVisibleOnWebsite,
  getCompanyAndWebsiteConfig,
} from "./companyConfig.js";

/**
 * SQLite Admin API Base URL configuration with full fallback chain
 */
export const ADMIN_API_BASE_URL =
  process.env.ADMIN_API_BASE_URL ||
  process.env.ADMIN_API_URL ||
  process.env.SQLITE_ADMIN_API_URL ||
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  process.env.NEXT_PUBLIC_ADMIN_API_URL ||
  process.env.NEXT_PUBLIC_SQLITE_ADMIN_API_URL ||
  "https://admin.rajbiosis.app";

export { COMPANY_ID, COMPANY_NAME, WEBSITE_ID, CURRENT_SITE, makeSlug, isItemVisibleOnWebsite, getCompanyAndWebsiteConfig };

/**
 * Helper to construct Admin API endpoints
 */
export function getAdminApiUrl(endpoint = "") {
  const base = ADMIN_API_BASE_URL.replace(/\/+$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

/**
 * Normalize and format product object
 */
export function formatProduct(p, catName = "", subName = "", catId = "", subId = "") {
  if (!p) return null;
  const title = p.title || p.name || "";
  const prodId = p.id || p.categoryProductId || p.productId || p.uid || makeSlug(title);
  const slug = p.slug || makeSlug(title) || prodId;
  const images =
    Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : p.image
        ? [p.image]
        : [];

  return {
    ...p,
    id: prodId,
    uid: p.uid || prodId,
    productId: p.productId || prodId,
    categoryProductId: p.categoryProductId || prodId,
    title: title,
    name: title,
    slug: slug,
    price: p.price || "",
    desc: p.desc || p.description || "",
    description: p.description || p.desc || "",
    capacity: p.capacity || "",
    throughput: p.throughput || "",
    instrument: p.instrument || "",
    model: p.model || "",
    usage: p.usage || "",
    brand: p.brand || "",
    parameters: p.parameters || "",
    automation: p.automation || "",
    availability: p.availability || "",
    size: p.size || "",
    companyId: p.companyId || COMPANY_ID,
    category: p.category || catName || "Other Products",
    subCategory: p.subCategory || subName || p.category || catName || "Other Products",
    categoryId: p.categoryId || catId || makeSlug(p.category || catName || "other"),
    subcategoryId: p.subcategoryId || subId || makeSlug(p.subCategory || subName || p.category || catName || "other"),
    type: p.type || (p.categoryId || p.category ? "category" : "normal"),
    image: images[0] || p.image || "",
    images: images,
    originalImages: p.originalImages || images,
    video: p.video || "",
    pdf: p.pdf || "",
    isPublished: p.isPublished !== false,
    status: p.status || "active",
    websiteIds: Array.isArray(p.websiteIds) ? p.websiteIds : [],
  };
}

/**
 * Fetch catalog directly from SQLite Admin API
 */
export async function fetchAdminCatalog({
  companyId = COMPANY_ID,
  websiteId = WEBSITE_ID,
  forceRefresh = false,
} = {}) {
  const url = getAdminApiUrl(
    `/api/catalog/?companyId=${encodeURIComponent(companyId)}&websiteId=${encodeURIComponent(websiteId)}`
  );

  try {
    const res = await fetch(url, {
      cache: forceRefresh ? "no-store" : "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.warn(`[admin-api] Catalog fetch responded with status ${res.status}`);
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

    // Filter and format products
    const visibleProducts = rawProducts
      .filter((p) => isItemVisibleOnWebsite(p, websiteId))
      .map((p) => formatProduct(p))
      .filter(Boolean);

    // Build categories
    const categoryMap = new Map();
    for (const cat of rawCategories) {
      if (isItemVisibleOnWebsite(cat, websiteId)) {
        categoryMap.set(cat.id || cat.name || cat.slug, cat);
      }
    }

    const categoryProducts = [];
    const normalProducts = [];

    for (const prod of visibleProducts) {
      if (prod.type === "category" || prod.category) {
        categoryProducts.push(prod);
      } else {
        normalProducts.push(prod);
      }
    }

    const visibleCatSet = new Set(visibleProducts.map((p) => p.category || "Other Products"));
    const uniqueCategories = Array.from(categoryMap.values()).filter((cat) =>
      visibleCatSet.has(cat.name || cat.category)
    );

    return {
      products: visibleProducts,
      categories: uniqueCategories.length > 0 ? uniqueCategories : Array.from(categoryMap.values()),
      categoryProducts,
      normalProducts,
      total: visibleProducts.length,
    };
  } catch (err) {
    console.warn("[admin-api] SQLite Admin catalog fetch failed:", err.message);
    return { products: [], categories: [], categoryProducts: [], normalProducts: [], total: 0 };
  }
}

/**
 * Fetch dynamic site data from SQLite Admin API
 */
export async function fetchAdminSiteData({
  type = "page",
  page = "home",
  district = "",
  websiteId = WEBSITE_ID,
  companyId = COMPANY_ID,
} = {}) {
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
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return json;
      }
    }

    // Fallback 1: If type was "page" and page is given (e.g. "home", "contact", "services"), try type=page directly
    if (type === "page" && page) {
      const altParams = new URLSearchParams({ companyId, websiteId, type: page });
      if (district) altParams.append("district", district);
      const altUrl = getAdminApiUrl(`/api/site-data/?${altParams.toString()}`);
      const altRes = await fetch(altUrl, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (altRes.ok) {
        const altJson = await altRes.json();
        if (altJson && altJson.data) {
          return altJson;
        }
      }
    }

    // Fallback 2: If type was direct (e.g. "home", "contact") without page, try type="page"&page=type
    if (type !== "page" && !page) {
      const altParams = new URLSearchParams({ companyId, websiteId, type: "page", page: type });
      if (district) altParams.append("district", district);
      const altUrl = getAdminApiUrl(`/api/site-data/?${altParams.toString()}`);
      const altRes = await fetch(altUrl, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (altRes.ok) {
        const altJson = await altRes.json();
        if (altJson && altJson.data) {
          return altJson;
        }
      }
    }

    return { success: true, data: null };
  } catch (err) {
    console.warn(`[admin-api] SQLite site-data (${type}/${page}) fetch failed:`, err.message);
    return { success: false, data: null, error: err.message };
  }
}

/**
 * Submit Contact Query to SQLite Admin API
 */
export async function submitAdminContactQuery(payload) {
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
    return { ok: res.ok, data };
  } catch (err) {
    console.warn("[admin-api] SQLite Admin contact-query forwarding:", err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * Submit Product Query to SQLite Admin API
 */
export async function submitAdminProductQuery(payload) {
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
    return { ok: res.ok, data };
  } catch (err) {
    console.warn("[admin-api] SQLite Admin product-query forwarding:", err.message);
    return { ok: false, error: err.message };
  }
}
