import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const WEBSITE_ID = "humanbiomedicalorg";
const COMPANY_ID = "human";
const COMPANY_NAME = "Human Biomedical";

const makeSlug = (text = "") =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Strict check: Only items explicitly assigned to humanbiomedicalorg or all are visible.
 */
function isVisibleOnSite(item) {
  if (!item) return false;
  if (item.isPublished === false || item.status === "inactive") return false;

  const wIds = item.websiteIds;
  if (!Array.isArray(wIds) || wIds.length === 0) {
    return false;
  }

  return (
    wIds.includes("all") ||
    wIds.includes(WEBSITE_ID) ||
    wIds.includes("humanbiomedical.org")
  );
}

function isCategoryVisible(cat) {
  if (!cat) return false;
  if (cat.status === "inactive") return false;

  const wIds = cat.websiteIds;
  if (!Array.isArray(wIds) || wIds.length === 0) {
    return false;
  }

  return (
    wIds.includes("all") ||
    wIds.includes(WEBSITE_ID) ||
    wIds.includes("humanbiomedical.org")
  );
}

function formatProduct(p, catName = "", subName = "", catId = "", subId = "") {
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

export async function GET() {
  try {
    const categoryMap = new Map();
    const allProductsMap = new Map();
    const categoryProducts = [];
    const normalProducts = [];

    // 1. Fetch categories & subcategories from companies/[COMPANY_ID]/categories
    try {
      const compCatSnap = await adminDb
        .collection("companies")
        .doc(COMPANY_ID)
        .collection("categories")
        .get();

      for (const catDoc of compCatSnap.docs) {
        const catData = catDoc.data();
        if (!isCategoryVisible(catData)) continue;

        const catId = catDoc.id;
        const catName = catData.name || catData.category || catId;
        const catSlug = catData.slug || makeSlug(catName);

        const subcategories = [];
        const subSnap = await catDoc.ref.collection("subcategories").get();

        for (const subDoc of subSnap.docs) {
          const subData = subDoc.data();
          if (!isCategoryVisible(subData)) continue;

          const subId = subDoc.id;
          const subName = subData.name || subData.subCategory || subId;
          const subSlug = subData.slug || makeSlug(subName);

          const subObj = {
            id: subId,
            name: subName,
            subCategory: subName,
            slug: subSlug,
            categoryId: catId,
            description: subData.description || "",
            image: subData.image || "",
            websiteIds: subData.websiteIds || [],
            products: [],
          };
          subcategories.push(subObj);

          if (Array.isArray(subData.products)) {
            for (const p of subData.products) {
              if (!isVisibleOnSite(p)) continue;
              const formatted = formatProduct(p, catName, subName, catId, subId);
              const key = formatted.id || formatted.categoryProductId || formatted.slug;
              if (!allProductsMap.has(key)) {
                allProductsMap.set(key, formatted);
                subObj.products.push(formatted);
              }
            }
          }
        }

        const catObj = {
          id: catId,
          name: catName,
          category: catName,
          slug: catSlug,
          description: catData.description || "",
          image: catData.image || "",
          websiteIds: catData.websiteIds || [],
          subcategories,
        };
        categoryMap.set(catId, catObj);
        categoryMap.set(catName, catObj);
        categoryMap.set(catSlug, catObj);
      }
    } catch (err) {
      console.warn("[catalog-api] companies categories error:", err.message);
    }

    // 2. Fetch category products from websites/[WEBSITE_ID]/pages/categoryproducts/categories
    try {
      const siteCatSnap = await adminDb
        .collection("websites")
        .doc(WEBSITE_ID)
        .collection("pages")
        .doc("categoryproducts")
        .collection("categories")
        .get();

      for (const catDoc of siteCatSnap.docs) {
        const catData = catDoc.data();
        if (!isCategoryVisible(catData)) continue;

        const catId = catDoc.id;
        const catName = catData.name || catData.category || catId;
        const catSlug = catData.slug || makeSlug(catName);

        let catObj = categoryMap.get(catId) || categoryMap.get(catName) || categoryMap.get(catSlug);
        if (!catObj) {
          catObj = {
            id: catId,
            name: catName,
            category: catName,
            slug: catSlug,
            description: catData.description || "",
            image: catData.image || "",
            websiteIds: catData.websiteIds || [],
            subcategories: [],
          };
          categoryMap.set(catId, catObj);
          categoryMap.set(catName, catObj);
          categoryMap.set(catSlug, catObj);
        }

        const subSnap = await catDoc.ref.collection("subcategories").get();
        for (const subDoc of subSnap.docs) {
          const subData = subDoc.data();
          if (!isCategoryVisible(subData)) continue;

          const subId = subDoc.id;
          const subName = subData.name || subData.subCategory || subId;
          const subSlug = subData.slug || makeSlug(subName);

          let subObj = catObj.subcategories.find(
            (s) => s.id === subId || s.slug === subSlug
          );
          if (!subObj) {
            subObj = {
              id: subId,
              name: subName,
              subCategory: subName,
              slug: subSlug,
              categoryId: catId,
              description: subData.description || "",
              image: subData.image || "",
              websiteIds: subData.websiteIds || [],
              products: [],
            };
            catObj.subcategories.push(subObj);
          }

          if (Array.isArray(subData.products)) {
            for (const p of subData.products) {
              if (!isVisibleOnSite(p)) continue;
              const formatted = formatProduct(p, catName, subName, catId, subId);
              const key = formatted.id || formatted.categoryProductId || formatted.slug;
              if (!allProductsMap.has(key)) {
                allProductsMap.set(key, formatted);
                subObj.products.push(formatted);
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn("[catalog-api] website categoryproducts error:", err.message);
    }

    // 3. Fetch products from companies/[COMPANY_ID]/products
    try {
      const prodSnap = await adminDb
        .collection("companies")
        .doc(COMPANY_ID)
        .collection("products")
        .get();

      for (const prodDoc of prodSnap.docs) {
        const rawProd = { id: prodDoc.id, ...prodDoc.data() };
        if (!isVisibleOnSite(rawProd)) continue;

        const catName = rawProd.category || "";
        const subName = rawProd.subCategory || catName;
        const catId = rawProd.categoryId || (catName ? makeSlug(catName) : "");
        const subId = rawProd.subcategoryId || (subName ? makeSlug(subName) : "");

        // STRICT: Product MUST belong to a category explicitly enabled for this website
        const matchedCat =
          categoryMap.get(catId) ||
          (catName ? categoryMap.get(catName) : null) ||
          (catName ? categoryMap.get(makeSlug(catName)) : null);

        // If category is not enabled/visible for this website in master categories, DO NOT show product
        if (!matchedCat) {
          continue;
        }

        const formatted = formatProduct(rawProd, matchedCat.name || catName, subName, catId, subId);
        const key = formatted.id || formatted.categoryProductId || formatted.slug;

        if (!allProductsMap.has(key)) {
          allProductsMap.set(key, formatted);

          if (Array.isArray(matchedCat.subcategories)) {
            let matchedSub = matchedCat.subcategories.find(
              (s) =>
                s.id === subId ||
                s.slug === subId ||
                s.name === subName ||
                s.subCategory === subName
            );

            if (!matchedSub) {
              matchedSub = {
                id: subId,
                name: subName,
                subCategory: subName,
                slug: makeSlug(subName),
                categoryId: matchedCat.id,
                description: "",
                image: rawProd.image || "",
                websiteIds: rawProd.websiteIds || [],
                products: [],
              };
              matchedCat.subcategories.push(matchedSub);
            }

            matchedSub.products.push(formatted);
          }
        }
      }
    } catch (err) {
      console.warn("[catalog-api] companies products error:", err.message);
    }

    const allProducts = Array.from(allProductsMap.values());

    for (const prod of allProducts) {
      if (prod.type === "category" || prod.category) {
        categoryProducts.push(prod);
      } else {
        normalProducts.push(prod);
      }
    }

    allProducts.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return dateB - dateA;
    });

    // Only include categories that have at least one visible product
    const visibleCategorySet = new Set(allProducts.map((p) => p.category || "Other Products"));
    const uniqueCategories = Array.from(
      new Set(Array.from(categoryMap.values()))
    ).filter((cat) => visibleCategorySet.has(cat.name || cat.category));

    return NextResponse.json(
      {
        products: allProducts,
        categories: uniqueCategories,
        categoryProducts,
        normalProducts,
        total: allProducts.length,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("[catalog-api] Unexpected error:", error);
    return NextResponse.json(
      {
        products: [],
        categories: [],
        categoryProducts: [],
        normalProducts: [],
        total: 0,
        error: error.message,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
      }
    );
  }
}
