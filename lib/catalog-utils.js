export const COMPANY_ID = process.env.COMPANY_ID || "human";
export const COMPANY_NAME = "Human Biomedical";
export const WEBSITE_ID = process.env.WEBSITE_ID || "humanbiomedicalorg";
export const CURRENT_SITE = process.env.NEXT_PUBLIC_WEBSITE_ID || "humanbiomedicalorg";

export const makeSlug = (text = "") =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export function detectCompanyId(siteId = WEBSITE_ID) {
  const s = String(siteId).toLowerCase();
  if (s.includes("rbpl")) return "rbpl";
  if (s.includes("human")) return "human";
  return "human";
}

/**
 * Check if a product or category is visible on the current website (humanbiomedicalorg)
 */
export function isItemVisibleOnWebsite(item, targetWebsiteId = WEBSITE_ID) {
  if (!item) return false;
  if (item.isPublished === false || item.status === "inactive") return false;

  const target = String(targetWebsiteId).toLowerCase().trim();

  const wIds = item.websiteIds;
  if (Array.isArray(wIds) && wIds.length > 0) {
    const list = wIds.map((w) => String(w).toLowerCase().trim());
    return (
      list.includes("all") ||
      list.includes(target) ||
      list.includes("humanbiomedicalorg") ||
      list.includes("humanbiomedical.org") ||
      list.includes("humanbiomedicalsorg") ||
      list.includes("human")
    );
  }

  if (item.websiteId) {
    const w = String(item.websiteId).toLowerCase().trim();
    return (
      w === "all" ||
      w === target ||
      w === "humanbiomedicalorg" ||
      w === "humanbiomedical.org" ||
      w === "humanbiomedicalsorg" ||
      w === "human"
    );
  }

  return true;
}

/**
 * Format and normalize product fields for consistent display and SEO
 */
export function normalizeProduct(p, catName = "", subName = "", idx = 0) {
  if (!p) return null;
  const title = (p.title || p.name || p.productName || "").trim();
  const prodId = p.id || p.categoryProductId || p.productId || p.uid || `${makeSlug(title)}-${idx}`;
  const slug = p.slug || makeSlug(title) || prodId;

  let images = [];
  if (Array.isArray(p.images) && p.images.length > 0) {
    images = p.images.filter(Boolean);
  } else if (p.image) {
    images = [p.image];
  } else if (p.imageUrl) {
    images = [p.imageUrl];
  } else if (p.originalImages && Array.isArray(p.originalImages) && p.originalImages.length > 0) {
    images = p.originalImages.filter(Boolean);
  }

  if (images.length === 0) {
    images = ["/humanlogo.png"];
  }

  return {
    ...p,
    id: prodId,
    uid: p.uid || prodId,
    productId: p.productId || prodId,
    categoryProductId: p.categoryProductId || prodId,
    title,
    name: title,
    slug,
    price: p.price || "",
    desc: p.desc || p.description || "",
    description: p.description || p.desc || "",
    capacity: p.capacity || "",
    throughput: p.throughput || "",
    instrument: p.instrument || "",
    model: p.model || "",
    usage: p.usage || "",
    brand: p.brand || "Human Biomedical",
    parameters: p.parameters || "",
    automation: p.automation || "",
    availability: p.availability || "In Stock",
    size: p.size || "",
    companyId: p.companyId || COMPANY_ID,
    category: p.category || catName || "Diagnostic Equipment",
    subCategory: p.subCategory || subName || p.category || catName || "Diagnostic Equipment",
    categoryId: p.categoryId || makeSlug(p.category || catName || "diagnostic-equipment"),
    subcategoryId: p.subcategoryId || makeSlug(p.subCategory || subName || p.category || catName || "diagnostic-equipment"),
    type: p.type || "category",
    image: images[0],
    images,
    originalImages: p.originalImages || images,
    video: p.video || "",
    pdf: p.pdf || "",
    isPublished: p.isPublished !== false,
    status: p.status || "active",
    websiteIds: Array.isArray(p.websiteIds) ? p.websiteIds : [WEBSITE_ID],
  };
}
