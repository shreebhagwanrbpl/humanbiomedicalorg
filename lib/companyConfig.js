// Company & Website Configuration for SQLite Admin API

export const COMPANY_ID = "human";
export const COMPANY_NAME = "Human Biomedical";
export const WEBSITE_ID = "humanbiomedicalorg";
export const CURRENT_SITE = "humanbiomedicalorg";

export const makeSlug = (text = "") =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Check if a product or category is visible on the current website (humanbiomedicalorg).
 */
export function isItemVisibleOnWebsite(item, targetWebsiteId = WEBSITE_ID) {
  if (!item) return false;
  if (item.isPublished === false || item.status === "inactive") return false;

  const wIds = item.websiteIds;
  if (Array.isArray(wIds) && wIds.length > 0) {
    return (
      wIds.includes("all") ||
      wIds.includes(targetWebsiteId) ||
      wIds.includes("humanbiomedicalorg") ||
      wIds.includes("humanbiomedical.org") ||
      wIds.includes("human")
    );
  }

  if (item.websiteId) {
    const w = String(item.websiteId).toLowerCase().trim();
    return (
      w === "all" ||
      w === targetWebsiteId.toLowerCase() ||
      w === "humanbiomedicalorg" ||
      w === "humanbiomedical.org" ||
      w === "human"
    );
  }

  return true;
}

export function getCompanyAndWebsiteConfig() {
  return {
    companyId: COMPANY_ID,
    companyName: COMPANY_NAME,
    websiteId: WEBSITE_ID,
    currentSite: CURRENT_SITE,
  };
}
