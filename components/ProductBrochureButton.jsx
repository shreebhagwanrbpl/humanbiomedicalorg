"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";

export default function ProductBrochureButton({ product }) {
  const brochureRef = useRef(null);

  const [downloading, setDownloading] = useState(false);
  const [brochureImage, setBrochureImage] = useState("");

  const handleDownloadBrochure = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (downloading || !product) return;

    setDownloading(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // -----------------------------------------
      // PRODUCT IMAGE
      // -----------------------------------------

      const imageUrl =
        product?.image ||
        product?.imageUrl ||
        product?.thumbnail ||
        product?.productImage ||
        product?.images?.[0] ||
        "";

      let base64Img = "";

      if (imageUrl) {
        try {
          // Next.js image optimizer as proxy
          const proxyUrl =
            `/_next/image?url=${encodeURIComponent(imageUrl)}&w=1000&q=90`;

          const response = await fetch(proxyUrl);

          if (response.ok) {
            const blob = await response.blob();

            base64Img = await new Promise((resolve) => {
              const reader = new FileReader();

              reader.onloadend = () => {
                resolve(reader.result);
              };

              reader.readAsDataURL(blob);
            });
          }
        } catch (imageError) {
          console.error(
            "Error converting product image:",
            imageError
          );
        }
      }

      // Fallback
      const finalImage =
        base64Img ||
        imageUrl ||
        "/placeholder.jpg";

      setBrochureImage(finalImage);

      // -----------------------------------------
      // BROCHURE TEMPLATE
      // -----------------------------------------

      const brochure = brochureRef.current;

      if (!brochure) {
        throw new Error("Brochure template not found");
      }

      // Temporarily show hidden template
      brochure.style.display = "block";
      brochure.style.position = "absolute";
      brochure.style.left = "-99999px";
      brochure.style.top = "0";

      // Wait for image/render
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      // -----------------------------------------
      // HTML → CANVAS
      // -----------------------------------------

      const canvas = await html2canvas(brochure, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Hide template again
      brochure.style.display = "none";

      // -----------------------------------------
      // CANVAS → PDF
      // -----------------------------------------

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const canvasRatio =
        canvas.height / canvas.width;

      const imageHeight =
        pdfWidth * canvasRatio;

      // Keep image within A4
      const finalHeight = Math.min(
        imageHeight,
        pdfHeight
      );

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        finalHeight,
        undefined,
        "FAST"
      );

      // -----------------------------------------
      // FILE NAME
      // -----------------------------------------

      const productName =
        product?.name ||
        product?.productName ||
        product?.title ||
        "Biomedical_Product";

      const safeName = productName
        .replace(/[^a-zA-Z0-9\s-_]/g, "")
        .trim()
        .replace(/\s+/g, "_");

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
      if (brochureRef.current) {
        brochureRef.current.style.display = "none";
      }

      setDownloading(false);
    }
  };

  // -----------------------------------------
  // PRODUCT DATA
  // -----------------------------------------

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

  return (
    <>
      {/* =====================================
          DOWNLOAD BUTTON
      ====================================== */}

      <button
        type="button"
        onClick={handleDownloadBrochure}
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
          transition
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

      {/* =====================================
          HIDDEN BROCHURE TEMPLATE
      ====================================== */}

      <div
        ref={brochureRef}
        style={{
          display: "none",
          width: "794px",
          minHeight: "1123px",
          padding: "42px",
          boxSizing: "border-box",
          background: "#ffffff",
          color: "#111827",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        {/* =================================
            HEADER
        ================================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "22px",
            borderBottom:
              "3px solid #4f46e5",
          }}
        >
          {/* Logo */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <img
              src="/logo.png"
              alt="Human Biomedical"
              style={{
                height: "58px",
                width: "auto",
                objectFit: "contain",
              }}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "25px",
                  fontWeight: "800",
                  color: "#111827",
                  letterSpacing: "-0.5px",
                }}
              >
                Human Biomedical
              </h1>

              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#6366f1",
                }}
              >
                Advanced Biomedical Solutions
              </p>
            </div>
          </div>

          {/* Right Header */}

          <div
            style={{
              textAlign: "right",
              fontSize: "11px",
              lineHeight: "1.7",
              color: "#6b7280",
            }}
          >
            <div
              style={{
                fontWeight: "700",
                color: "#4f46e5",
                fontSize: "12px",
              }}
            >
              PRODUCT BROCHURE
            </div>

            <div>
              humanbiomedical.org
            </div>
          </div>
        </div>

        {/* =================================
            PRODUCT TITLE
        ================================= */}

        <div
          style={{
            marginTop: "28px",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding:
                "6px 12px",
              borderRadius: "20px",
              background: "#eef2ff",
              color: "#4f46e5",
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Featured Product
          </div>

          <h2
            style={{
              margin:
                "12px 0 0",
              fontSize: "29px",
              lineHeight: "1.2",
              fontWeight: "800",
              color: "#111827",
            }}
          >
            {productName}
          </h2>
        </div>

        {/* =================================
            IMAGE + DETAILS
        ================================= */}

        <div
          style={{
            display: "flex",
            gap: "25px",
            marginTop: "25px",
          }}
        >
          {/* Product Image */}

          <div
            style={{
              width: "53%",
              height: "330px",
              padding: "20px",
              boxSizing: "border-box",
              borderRadius: "20px",
              border:
                "1px solid #e5e7eb",
              background:
                "linear-gradient(135deg,#f8fafc,#eef2ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={
                brochureImage ||
                "/placeholder.jpg"
              }
              alt={productName}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Product Details */}

          <div
            style={{
              flex: 1,
              border:
                "1px solid #e5e7eb",
              borderRadius: "20px",
              padding: "22px",
              background: "#ffffff",
            }}
          >
            <h3
              style={{
                margin:
                  "0 0 18px",
                paddingBottom: "10px",
                borderBottom:
                  "1px solid #e5e7eb",
                color: "#4f46e5",
                fontSize: "18px",
                fontWeight: "800",
              }}
            >
              Product Details
            </h3>

            {product?.brand && (
              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong
                  style={{
                    color: "#111827",
                  }}
                >
                  Brand:
                </strong>{" "}
                {product.brand}
              </div>
            )}

            {product?.model && (
              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong
                  style={{
                    color: "#111827",
                  }}
                >
                  Model:
                </strong>{" "}
                {product.model}
              </div>
            )}

            {product?.category && (
              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong
                  style={{
                    color: "#111827",
                  }}
                >
                  Category:
                </strong>{" "}
                {product.category}
              </div>
            )}

            {product?.subCategory && (
              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong
                  style={{
                    color: "#111827",
                  }}
                >
                  Subcategory:
                </strong>{" "}
                {product.subCategory}
              </div>
            )}

            {product?.instrument && (
              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong
                  style={{
                    color: "#111827",
                  }}
                >
                  Instrument:
                </strong>{" "}
                {product.instrument}
              </div>
            )}

            {product?.country && (
              <div
                style={{
                  marginBottom: "12px",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                <strong
                  style={{
                    color: "#111827",
                  }}
                >
                  Country:
                </strong>{" "}
                {product.country}
              </div>
            )}
          </div>
        </div>

        {/* =================================
            PRODUCT OVERVIEW
        ================================= */}

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h3
            style={{
              margin:
                "0 0 12px",
              paddingLeft: "12px",
              borderLeft:
                "4px solid #4f46e5",
              color: "#111827",
              fontSize: "18px",
              fontWeight: "800",
            }}
          >
            Product Overview
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              lineHeight: "1.8",
              color: "#4b5563",
              textAlign: "justify",
            }}
          >
            {description}
          </p>
        </div>

        {/* =================================
            FEATURES
        ================================= */}

        {Array.isArray(product?.features) &&
          product.features.length > 0 && (
            <div
              style={{
                marginTop: "28px",
              }}
            >
              <h3
                style={{
                  margin:
                    "0 0 14px",
                  paddingLeft: "12px",
                  borderLeft:
                    "4px solid #4f46e5",
                  color: "#111827",
                  fontSize: "18px",
                  fontWeight: "800",
                }}
              >
                Key Features
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: "9px 20px",
                }}
              >
                {product.features
                  .slice(0, 8)
                  .map(
                    (feature, index) => (
                      <div
                        key={index}
                        style={{
                          fontSize:
                            "12px",
                          color:
                            "#4b5563",
                        }}
                      >
                        <span
                          style={{
                            color:
                              "#4f46e5",
                            fontWeight:
                              "800",
                          }}
                        >
                          ✓
                        </span>{" "}
                        {typeof feature ===
                        "string"
                          ? feature
                          : feature?.name ||
                            feature?.title ||
                            ""}
                      </div>
                    )
                  )}
              </div>
            </div>
          )}

        {/* =================================
            BOTTOM CTA
        ================================= */}

        <div
          style={{
            marginTop: "35px",
            padding: "20px 22px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#eef2ff,#f5f3ff)",
            border:
              "1px solid #e0e7ff",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: "800",
              color: "#111827",
            }}
          >
            Need More Information?
          </div>

          <div
            style={{
              marginTop: "6px",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Contact Human Biomedical for product
            specifications, pricing, installation
            and technical support.
          </div>
        </div>

        {/* =================================
            FOOTER
        ================================= */}

        <div
          style={{
            marginTop: "35px",
            paddingTop: "18px",
            borderTop:
              "1px solid #e5e7eb",
            textAlign: "center",
            fontSize: "10px",
            lineHeight: "1.6",
            color: "#6b7280",
          }}
        >
          <div
            style={{
              fontWeight: "700",
              color: "#4f46e5",
            }}
          >
            HUMAN BIOMEDICAL
          </div>

          <div>
            Advanced Biomedical Equipment &
            Healthcare Solutions
          </div>

          <div>
            humanbiomedical.org
          </div>

          <div
            style={{
              marginTop: "5px",
            }}
          >
            © 2026 Human Biomedical. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}