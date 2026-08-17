"use client";

import { useState } from "react";
import { Download } from "lucide-react";

export default function ProductBrochureButton({ product }) {
  const [downloading, setDownloading] = useState(false);

  // =========================================================
  // PRODUCT DATA
  // =========================================================

  const productName =
    product?.name ||
    product?.productName ||
    product?.title ||
    "Biomedical Equipment";

  const description =
    product?.description ||
    product?.desc ||
    product?.shortDescription ||
    "Advanced biomedical equipment designed for hospitals, laboratories and diagnostic centres.";

  // IMPORTANT:
  // Your website is using product.image as the main product image.
  const productImage =
    product?.image ||
    product?.images?.[0] ||
    product?.imageUrl ||
    product?.thumbnail ||
    product?.productImage ||
    "";

  const features = Array.isArray(product?.features)
    ? product.features
    : [];

  // =========================================================
  // IMAGE -> DATA URL
  // =========================================================

  const loadImageAsDataURL = async (url) => {
    if (!url) return "";

    try {
      // -------------------------------------------------------
      // FIRST TRY: SAME ORIGIN IMAGE PROXY
      // -------------------------------------------------------

      const proxyUrl =
        `/api/image-proxy?url=${encodeURIComponent(url)}`;

      const response = await fetch(proxyUrl, {
        cache: "no-store",
      });

      if (response.ok) {
        const blob = await response.blob();

        if (
          blob &&
          blob.type &&
          blob.type.startsWith("image/")
        ) {
          return await blobToDataURL(blob);
        }
      }

      // -------------------------------------------------------
      // SECOND TRY: DIRECT IMAGE
      // -------------------------------------------------------

      try {
        return await imageElementToDataURL(url);
      } catch (directError) {
        console.warn(
          "Direct image loading failed:",
          directError
        );
      }

      throw new Error(
        "Unable to load product image"
      );
    } catch (error) {
      console.error(
        "Product image loading failed:",
        error
      );

      return "";
    }
  };

  // =========================================================
  // BLOB -> DATA URL
  // =========================================================

  const blobToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(blob);
    });
  };

  // =========================================================
  // DIRECT IMAGE -> DATA URL
  // =========================================================

  const imageElementToDataURL = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.crossOrigin = "anonymous";

      img.onload = () => {
        try {
          const canvas =
            document.createElement("canvas");

          const width =
            img.naturalWidth || img.width;

          const height =
            img.naturalHeight || img.height;

          if (!width || !height) {
            reject(
              new Error(
                "Invalid image dimensions"
              )
            );
            return;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx =
            canvas.getContext("2d");

          if (!ctx) {
            reject(
              new Error(
                "Canvas context unavailable"
              )
            );
            return;
          }

          ctx.drawImage(
            img,
            0,
            0,
            width,
            height
          );

          resolve(
            canvas.toDataURL(
              "image/jpeg",
              0.92
            )
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(
          new Error(
            "Unable to load image directly"
          )
        );
      };

      img.src = url;
    });
  };

  // =========================================================
  // IMAGE FORMAT
  // =========================================================

  const getImageFormat = (dataUrl) => {
    if (!dataUrl) return "JPEG";

    if (
      dataUrl.includes("image/png") ||
      dataUrl.startsWith(
        "data:image/png"
      )
    ) {
      return "PNG";
    }

    return "JPEG";
  };

  // =========================================================
  // DOWNLOAD BROCHURE
  // =========================================================

  const handleDownloadBrochure = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (downloading || !product) {
      return;
    }

    try {
      setDownloading(true);

      const { jsPDF } =
        await import("jspdf");

      // =====================================================
      // LOAD PRODUCT IMAGE
      // =====================================================

      let imageData = "";

      if (productImage) {
        imageData =
          await loadImageAsDataURL(
            productImage
          );
      }

      console.log(
        "Brochure product image URL:",
        productImage
      );

      console.log(
        "Brochure image loaded:",
        !!imageData
      );

      // =====================================================
      // PDF
      // =====================================================

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const PAGE_WIDTH = 210;
      const PAGE_HEIGHT = 297;

      const MARGIN = 15;

      const CONTENT_WIDTH =
        PAGE_WIDTH - MARGIN * 2;

      // =====================================================
      // COLORS
      // =====================================================

      const PURPLE = [
        79,
        70,
        229,
      ];

      const DARK = [
        17,
        24,
        39,
      ];

      const MUTED = [
        107,
        114,
        128,
      ];

      const BORDER = [
        229,
        231,
        235,
      ];

      // =====================================================
      // HEADER
      // =====================================================

      let y = 15;

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(19);

      pdf.setTextColor(
        ...DARK
      );

      pdf.text(
        "Human Biomedical",
        MARGIN,
        y
      );

      pdf.setFontSize(7);

      pdf.setTextColor(
        ...PURPLE
      );

      pdf.text(
        "ADVANCED BIOMEDICAL SOLUTIONS",
        MARGIN,
        y + 7
      );

      // RIGHT HEADER

      pdf.setFontSize(7.5);

      pdf.setTextColor(
        ...PURPLE
      );

      pdf.text(
        "PRODUCT BROCHURE",
        PAGE_WIDTH - MARGIN,
        y,
        {
          align: "right",
        }
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(6.8);

      pdf.setTextColor(
        ...MUTED
      );

      pdf.text(
        "humanbiomedical.org",
        PAGE_WIDTH - MARGIN,
        y + 7,
        {
          align: "right",
        }
      );

      // =====================================================
      // HEADER LINE
      // =====================================================

      y += 13;

      pdf.setDrawColor(
        ...PURPLE
      );

      pdf.setLineWidth(
        0.9
      );

      pdf.line(
        MARGIN,
        y,
        PAGE_WIDTH - MARGIN,
        y
      );

      y += 11;

      // =====================================================
      // FEATURED BADGE
      // =====================================================

      pdf.setFillColor(
        238,
        242,
        255
      );

      pdf.roundedRect(
        MARGIN,
        y - 5,
        39,
        8,
        4,
        4,
        "F"
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(6.8);

      pdf.setTextColor(
        ...PURPLE
      );

      pdf.text(
        "FEATURED PRODUCT",
        MARGIN + 5,
        y
      );

      y += 11;

      // =====================================================
      // PRODUCT TITLE
      // =====================================================

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(18);

      pdf.setTextColor(
        ...DARK
      );

      const titleLines =
        pdf.splitTextToSize(
          productName,
          CONTENT_WIDTH
        );

      pdf.text(
        titleLines,
        MARGIN,
        y
      );

      y +=
        titleLines.length * 7 +
        5;

      // =====================================================
      // IMAGE + DETAILS
      // =====================================================

      const imageBoxX =
        MARGIN;

      const imageBoxY =
        y;

      const imageBoxWidth =
        100;

      const imageBoxHeight =
        70;

      const detailsX =
        imageBoxX +
        imageBoxWidth +
        7;

      const detailsWidth =
        PAGE_WIDTH -
        MARGIN -
        detailsX;

      // =====================================================
      // IMAGE BOX
      // =====================================================

      pdf.setFillColor(
        247,
        248,
        252
      );

      pdf.setDrawColor(
        ...BORDER
      );

      pdf.setLineWidth(
        0.4
      );

      pdf.roundedRect(
        imageBoxX,
        imageBoxY,
        imageBoxWidth,
        imageBoxHeight,
        6,
        6,
        "FD"
      );

      // =====================================================
      // PRODUCT IMAGE
      // =====================================================

      if (imageData) {
        try {
          const format =
            getImageFormat(
              imageData
            );

          const img =
            await getImageDimensions(
              imageData
            );

          const padding = 6;

          const maxWidth =
            imageBoxWidth -
            padding * 2;

          const maxHeight =
            imageBoxHeight -
            padding * 2;

          const ratio =
            Math.min(
              maxWidth / img.width,
              maxHeight / img.height
            );

          const drawWidth =
            img.width * ratio;

          const drawHeight =
            img.height * ratio;

          const drawX =
            imageBoxX +
            (imageBoxWidth -
              drawWidth) /
            2;

          const drawY =
            imageBoxY +
            (imageBoxHeight -
              drawHeight) /
            2;

          pdf.addImage(
            imageData,
            format,
            drawX,
            drawY,
            drawWidth,
            drawHeight,
            undefined,
            "MEDIUM"
          );
        } catch (error) {
          console.error(
            "PDF image error:",
            error
          );

          drawImagePlaceholder(
            pdf,
            imageBoxX,
            imageBoxY,
            imageBoxWidth,
            imageBoxHeight,
            MUTED
          );
        }
      } else {
        drawImagePlaceholder(
          pdf,
          imageBoxX,
          imageBoxY,
          imageBoxWidth,
          imageBoxHeight,
          MUTED
        );
      }

      // =====================================================
      // DETAILS CARD
      // =====================================================

      pdf.setFillColor(
        255,
        255,
        255
      );

      pdf.setDrawColor(
        ...BORDER
      );

      pdf.roundedRect(
        detailsX,
        imageBoxY,
        detailsWidth,
        imageBoxHeight,
        6,
        6,
        "FD"
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(10.5);

      pdf.setTextColor(
        ...PURPLE
      );

      pdf.text(
        "Product Details",
        detailsX + 6,
        imageBoxY + 11
      );

      pdf.setDrawColor(
        ...BORDER
      );

      pdf.line(
        detailsX + 6,
        imageBoxY + 16,
        detailsX +
        detailsWidth -
        6,
        imageBoxY + 16
      );

      let detailY =
        imageBoxY + 24;

      const detailItems = [
        [
          "Brand",
          product?.brand,
        ],
        [
          "Model",
          product?.model,
        ],
        [
          "Category",
          product?.category,
        ],
        [
          "Subcategory",
          product?.subCategory ||
          product?.subcategory,
        ],
        [
          "Instrument",
          product?.instrument,
        ],
        [
          "Country",
          product?.country,
        ],
      ];

      detailItems.forEach(
        ([label, value]) => {
          if (
            value ===
            undefined ||
            value === null ||
            String(value).trim() ===
            ""
          ) {
            return;
          }

          pdf.setFont(
            "helvetica",
            "bold"
          );

          pdf.setFontSize(6.7);

          pdf.setTextColor(
            ...DARK
          );

          pdf.text(
            `${label}:`,
            detailsX + 6,
            detailY
          );

          pdf.setFont(
            "helvetica",
            "normal"
          );

          pdf.setTextColor(
            ...MUTED
          );

          const valueLines =
            pdf.splitTextToSize(
              String(value),
              detailsWidth - 39
            );

          pdf.text(
            valueLines,
            detailsX + 30,
            detailY
          );

          detailY += Math.max(
            4.5,
            valueLines.length *
            3.5
          );
        }
      );

      y =
        imageBoxY +
        imageBoxHeight +
        9;

      // =====================================================
      // PRODUCT OVERVIEW
      // =====================================================

      drawSectionTitle(
        pdf,
        "Product Overview",
        MARGIN,
        y,
        PURPLE,
        DARK
      );

      y += 8;

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(8);

      pdf.setTextColor(
        ...MUTED
      );

      const overviewLines =
        pdf.splitTextToSize(
          description,
          CONTENT_WIDTH
        );

      // Keep overview compact
      const limitedOverview =
        overviewLines.slice(
          0,
          3
        );

      pdf.text(
        limitedOverview,
        MARGIN,
        y
      );

      y +=
        limitedOverview.length *
        4 +
        8;

      // =====================================================
      // TECHNICAL SPECIFICATIONS
      // =====================================================

      const specificationItems = [
        [
          "Brand",
          product?.brand,
        ],
        [
          "Model",
          product?.model,
        ],
        [
          "Instrument",
          product?.instrument,
        ],
        [
          "Category",
          product?.category,
        ],
        [
          "Subcategory",
          product?.subCategory ||
          product?.subcategory,
        ],
        [
          "Capacity",
          product?.capacity,
        ],
        [
          "Throughput",
          product?.throughput,
        ],
        [
          "Automation",
          product?.automation,
        ],
        [
          "Country",
          product?.country,
        ],
        [
          "Usage",
          product?.usage,
        ],
      ].filter(
        ([, value]) =>
          value !==
          undefined &&
          value !== null &&
          String(value).trim() !==
          ""
      );

      if (
        specificationItems.length >
        0
      ) {
        drawSectionTitle(
          pdf,
          "Technical Specifications",
          MARGIN,
          y,
          PURPLE,
          DARK
        );

        y += 7;

        const tableWidth =
          CONTENT_WIDTH;

        const labelWidth =
          48;

        const valueWidth =
          tableWidth -
          labelWidth;

        // IMPORTANT:
        // Limit specs so brochure stays on ONE page.
        const visibleSpecifications =
          specificationItems.slice(
            0,
            8
          );

        visibleSpecifications.forEach(
          (
            [label, value],
            index
          ) => {
            const valueLines =
              pdf.splitTextToSize(
                String(value),
                valueWidth - 8
              );

            const rowHeight =
              Math.max(
                7,
                valueLines.length *
                3.8 +
                2.5
              );

            if (
              index % 2 ===
              0
            ) {
              pdf.setFillColor(
                248,
                250,
                252
              );

              pdf.rect(
                MARGIN,
                y - 4.5,
                tableWidth,
                rowHeight,
                "F"
              );
            }

            pdf.setFont(
              "helvetica",
              "bold"
            );

            pdf.setFontSize(6.8);

            pdf.setTextColor(
              ...DARK
            );

            pdf.text(
              label,
              MARGIN + 4,
              y
            );

            pdf.setFont(
              "helvetica",
              "normal"
            );

            pdf.setTextColor(
              ...MUTED
            );

            pdf.text(
              valueLines,
              MARGIN +
              labelWidth,
              y
            );

            y += rowHeight;
          }
        );

        y += 5;
      }

      // =====================================================
      // KEY FEATURES
      // =====================================================

      if (
        features.length >
        0
      ) {
        // Only show a compact number
        // of features to keep one-page layout.
        const featureList =
          features
            .slice(0, 6)
            .map(
              getFeatureText
            )
            .filter(Boolean);

        if (
          featureList.length >
          0
        ) {
          drawSectionTitle(
            pdf,
            "Key Features",
            MARGIN,
            y,
            PURPLE,
            DARK
          );

          y += 7;

          const featureColumns =
            2;

          const columnWidth =
            (CONTENT_WIDTH -
              8) /
            featureColumns;

          for (
            let i = 0;
            i <
            featureList.length;
            i += 2
          ) {
            const left =
              featureList[i] ||
              "";

            const right =
              featureList[i + 1] ||
              "";

            const leftLines =
              left
                ? pdf.splitTextToSize(
                  left,
                  columnWidth - 8
                )
                : [];

            const rightLines =
              right
                ? pdf.splitTextToSize(
                  right,
                  columnWidth - 8
                )
                : [];

            const rowHeight =
              Math.max(
                leftLines.length,
                rightLines.length,
                1
              ) *
              3.8 +
              3;

            drawFeature(
              pdf,
              left,
              MARGIN,
              y,
              columnWidth,
              PURPLE,
              MUTED
            );

            drawFeature(
              pdf,
              right,
              MARGIN +
              columnWidth +
              8,
              y,
              columnWidth,
              PURPLE,
              MUTED
            );

            y += rowHeight;
          }

          y += 4;
        }
      }

      // =====================================================
      // APPLICATIONS
      // =====================================================

      const applications =
        product?.applications ||
        product?.application ||
        "";

      if (
        applications &&
        y < 225
      ) {
        drawSectionTitle(
          pdf,
          "Applications",
          MARGIN,
          y,
          PURPLE,
          DARK
        );

        y += 7;

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(7.5);

        pdf.setTextColor(
          ...MUTED
        );

        const applicationLines =
          pdf
            .splitTextToSize(
              String(
                applications
              ),
              CONTENT_WIDTH
            )
            .slice(0, 2);

        pdf.text(
          applicationLines,
          MARGIN,
          y
        );

        y +=
          applicationLines.length *
          4 +
          5;
      }

      // =====================================================
      // CTA
      // =====================================================

      // ALWAYS keep CTA inside page 1.
      // We don't create a new page here.

      const CTA_HEIGHT =
        27;

      const CTA_Y =
        Math.min(
          Math.max(
            y,
            215
          ),
          238
        );

      pdf.setFillColor(
        244,
        245,
        255
      );

      pdf.setDrawColor(
        224,
        231,
        255
      );

      pdf.roundedRect(
        MARGIN,
        CTA_Y,
        CONTENT_WIDTH,
        CTA_HEIGHT,
        6,
        6,
        "FD"
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(10);

      pdf.setTextColor(
        ...DARK
      );

      pdf.text(
        "Need More Information?",
        MARGIN + 7,
        CTA_Y + 9
      );

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(7);

      pdf.setTextColor(
        ...MUTED
      );

      const ctaText =
        "Contact Human Biomedical for product specifications, pricing, installation and technical support.";

      const ctaLines =
        pdf.splitTextToSize(
          ctaText,
          CONTENT_WIDTH - 14
        );

      pdf.text(
        ctaLines.slice(0, 1),
        MARGIN + 7,
        CTA_Y + 15
      );

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(7);

      pdf.setTextColor(
        ...PURPLE
      );

      pdf.text(
        "humanbiomedical.org",
        MARGIN + 7,
        CTA_Y + 23
      );

      // =====================================================
      // FOOTER
      // =====================================================

      addFooter(
        pdf,
        PAGE_WIDTH,
        PAGE_HEIGHT,
        MARGIN,
        PURPLE,
        MUTED
      );

      // =====================================================
      // FILE NAME
      // =====================================================

      const safeName =
        productName
          .replace(
            /[^a-zA-Z0-9\s-_]/g,
            ""
          )
          .trim()
          .replace(
            /\s+/g,
            "_"
          )
          .substring(
            0,
            100
          );

      pdf.save(
        `Human_Biomedical_${safeName}_Brochure.pdf`
      );
    } catch (error) {
      console.error(
        "Brochure generation error:",
        error
      );

      alert(
        "Unable to generate brochure. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  };

  // =========================================================
  // BUTTON
  // =========================================================

  return (
    <button
      type="button"
      onClick={
        handleDownloadBrochure
      }
      disabled={downloading}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-indigo-200
        bg-indigo-50
        px-4
        py-2.5
        text-sm
        font-bold
        text-indigo-700
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-indigo-600
        hover:text-white
        hover:shadow-lg
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {downloading ? (
        <>
          <span
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-indigo-300
              border-t-indigo-700
            "
          />

          Generating...
        </>
      ) : (
        <>
          <Download size={16} />

          Brochure
        </>
      )}
    </button>
  );
}

// =========================================================
// IMAGE DIMENSIONS
// =========================================================

function getImageDimensions(
  dataUrl
) {
  return new Promise(
    (resolve, reject) => {
      const img =
        new Image();

      img.onload = () => {
        const width =
          img.naturalWidth ||
          img.width;

        const height =
          img.naturalHeight ||
          img.height;

        if (
          !width ||
          !height
        ) {
          reject(
            new Error(
              "Invalid image dimensions"
            )
          );
          return;
        }

        resolve({
          width,
          height,
        });
      };

      img.onerror = () => {
        reject(
          new Error(
            "Unable to read image dimensions"
          )
        );
      };

      img.src = dataUrl;
    }
  );
}

// =========================================================
// SECTION TITLE
// =========================================================

function drawSectionTitle(
  pdf,
  title,
  x,
  y,
  purple,
  dark
) {
  pdf.setFillColor(
    ...purple
  );

  pdf.roundedRect(
    x,
    y - 5.5,
    1.7,
    7,
    0.8,
    0.8,
    "F"
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(10.5);

  pdf.setTextColor(
    ...dark
  );

  pdf.text(
    title,
    x + 6,
    y
  );
}

// =========================================================
// FEATURE
// =========================================================

function drawFeature(
  pdf,
  text,
  x,
  y,
  width,
  purple,
  muted
) {
  if (!text) return;

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(7.5);

  pdf.setTextColor(
    ...purple
  );

  pdf.text(
    "✓",
    x,
    y
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(7.2);

  pdf.setTextColor(
    ...muted
  );

  const lines =
    pdf.splitTextToSize(
      text,
      width - 8
    );

  pdf.text(
    lines.slice(0, 2),
    x + 5,
    y
  );
}

// =========================================================
// FEATURE TEXT
// =========================================================

function getFeatureText(
  feature
) {
  if (!feature) return "";

  if (
    typeof feature ===
    "string"
  ) {
    return feature;
  }

  return (
    feature?.name ||
    feature?.title ||
    feature?.description ||
    ""
  );
}

// =========================================================
// IMAGE PLACEHOLDER
// =========================================================

function drawImagePlaceholder(
  pdf,
  x,
  y,
  width,
  height,
  muted
) {
  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(7.5);

  pdf.setTextColor(
    ...muted
  );

  pdf.text(
    "PRODUCT IMAGE",
    x +
    width / 2,
    y +
    height / 2,
    {
      align: "center",
    }
  );
}

// =========================================================
// FOOTER
// =========================================================

function addFooter(
  pdf,
  pageWidth,
  pageHeight,
  margin,
  purple,
  muted
) {
  const footerY =
    pageHeight - 10;

  pdf.setDrawColor(
    229,
    231,
    235
  );

  pdf.setLineWidth(
    0.3
  );

  pdf.line(
    margin,
    footerY - 7,
    pageWidth - margin,
    footerY - 7
  );

  pdf.setFont(
    "helvetica",
    "bold"
  );

  pdf.setFontSize(6.5);

  pdf.setTextColor(
    ...purple
  );

  pdf.text(
    "HUMAN BIOMEDICAL",
    pageWidth / 2,
    footerY - 2,
    {
      align: "center",
    }
  );

  pdf.setFont(
    "helvetica",
    "normal"
  );

  pdf.setFontSize(5.8);

  pdf.setTextColor(
    ...muted
  );

  pdf.text(
    "Advanced Biomedical Equipment & Healthcare Solutions",
    pageWidth / 2,
    footerY + 2,
    {
      align: "center",
    }
  );

  pdf.text(
    "humanbiomedical.org",
    pageWidth / 2,
    footerY + 6,
    {
      align: "center",
    }
  );
}