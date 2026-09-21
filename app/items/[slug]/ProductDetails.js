"use client";

import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import "./page.css";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

import {
    FaPlay,
    FaShareAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaLink,
} from "react-icons/fa";

import {
    addDoc,
    collection,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { fetchFullCatalog } from "@/lib/data-fetcher";
import ProductBrochureButton from "@/components/ProductBrochureButton";


export default function ProductDetails({
    slug,
    product: initialProduct,
    city: propCity = null
}) {

    const [product, setProduct] = useState(initialProduct || null);

    const [imageLoaded, setImageLoaded] = useState(false);

    const [selectedImage, setSelectedImage] = useState(() => {
        if (initialProduct) {
            return initialProduct.images?.length > 0
                ? initialProduct.images[0]
                : (initialProduct.image || "");
        }

        return "";
    });

    const [selectedMedia, setSelectedMedia] = useState("image");

    const [showShare, setShowShare] = useState(false);

    const [loading, setLoading] = useState(!initialProduct);

    const shareRef = useRef();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const pathname = usePathname();


    /*
     * =========================================================
     * CITY / DISTRICT DETECTION
     * =========================================================
     *
     * Supported URLs:
     *
     * /items/product-slug
     *     => India
     *
     * /jaipur/items/product-slug
     *     => Jaipur
     *
     * /jodhpur/items/product-slug
     *     => Jodhpur
     *
     * This prevents "items" from being treated as city.
     */

    const pathParts = (pathname || "")
        .split("/")
        .filter(Boolean);

    const cityFromPath =
        pathParts.length >= 3 &&
            pathParts[1] === "items"
            ? pathParts[0]
            : "";

    const rawCity = propCity || cityFromPath;
    const isSpecificDistrict = Boolean(
        rawCity &&
        typeof rawCity === "string" &&
        rawCity.trim() !== "" &&
        rawCity.trim().toLowerCase() !== "india"
    );

    const city = isSpecificDistrict ? rawCity.trim() : "";

    const cityName = isSpecificDistrict
        ? (rawCity.charAt(0).toUpperCase() + rawCity.slice(1))
        : "India";


    /*
     * =========================================================
     * LOAD PRODUCT
     * =========================================================
     */

    useEffect(() => {

        if (initialProduct) {

            setProduct(initialProduct);

            setSelectedImage(
                initialProduct.images?.length > 0
                    ? initialProduct.images[0]
                    : (initialProduct.image || "")
            );

            setSelectedMedia("image");

            setLoading(false);

            return;
        }


        const loadProduct = async () => {

            try {

                setLoading(true);

                const allProducts = await fetchFullCatalog();

                const found = allProducts.find(
                    (p) => p.slug === slug
                );

                setProduct(found || null);


                if (found) {

                    if (found.images?.length > 0) {

                        setSelectedImage(
                            found.images[0]
                        );

                    } else {

                        setSelectedImage(
                            found.image || ""
                        );
                    }

                    setSelectedMedia("image");
                }

            } catch (error) {

                console.error(
                    "Error loading product details:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };


        loadProduct();

    }, [slug, initialProduct]);


    /*
     * =========================================================
     * ENQUIRY FORM
     * =========================================================
     */

    const handleSubmit = async (e) => {

        e.preventDefault();


        const phoneRegex = /^[6-9]\d{9}$/;

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!form.name.trim()) {

            return toast.error(
                "Name is required"
            );
        }


        if (!emailRegex.test(form.email)) {

            return toast.error(
                "Enter valid email"
            );
        }


        if (!phoneRegex.test(form.phone)) {

            return toast.error(
                "Enter valid mobile number"
            );
        }


        try {

            setSubmitting(true);


            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "humanbiomedicalorg",
                    "productQueries"
                ),
                {
                    ...form,

                    productName:
                        product?.title || "",

                    productSlug:
                        product?.slug || slug,

                    brand:
                        product?.brand || "",

                    model:
                        product?.model || "",

                    createdAt: new Date(),
                }
            );


            toast.success(
                "Your enquiry has been submitted successfully."
            );


            setForm({
                name: "",
                email: "",
                phone: "",
            });


        } catch (error) {

            console.error(
                "Error submitting query:",
                error
            );

            toast.error(
                "Something went wrong"
            );

        } finally {

            setSubmitting(false);
        }
    };


    /*
     * =========================================================
     * PRODUCT SCHEMA
     * =========================================================
     */

    const productSchema = product
        ? {

            "@context": "https://schema.org",

            "@type": "Product",

            name: product.title,

            image: product.image
                ? [product.image]
                : [],

            description:
                product.desc ||
                product.description ||
                product.title,

            brand: {
                "@type": "Brand",
                name:
                    product.brand ||
                    "Human Biomedical",
            },

        }
        : null;


    /*
     * =========================================================
     * FAQ SCHEMA
     * =========================================================
     */

    const faqSchema = product
        ? {

            "@context": "https://schema.org",

            "@type": "FAQPage",

            mainEntity: [

                {
                    "@type": "Question",

                    name:
                        `What is ${product.title} used for?`,

                    acceptedAnswer: {

                        "@type": "Answer",

                        text:
                            `${product.title} is used in hospitals, pathology labs and diagnostic centres.`,

                    },
                },


                {
                    "@type": "Question",

                    name:
                        "Do you provide installation support?",

                    acceptedAnswer: {

                        "@type": "Answer",

                        text:
                            "Yes, installation and technical support are available.",

                    },
                },

            ],

        }
        : null;


    /*
     * =========================================================
     * SHARE FUNCTIONS
     * =========================================================
     */

    const handleCopy = async () => {

        await navigator.clipboard.writeText(
            window.location.href
        );

        toast.success("Link Copied");

        setShowShare(false);
    };


    const handleWhatsapp = () => {

        const shareText =
            `🔬 ${product?.title}\n\n` +
            `${product?.desc || ""}\n\n` +
            `🌐 ${window.location.href}`;


        window.open(
            `https://wa.me/?text=${encodeURIComponent(
                shareText
            )}`,
            "_blank"
        );
    };


    const handleFacebook = () => {

        window.open(

            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href
            )}`,

            "_blank"
        );
    };


    const handleInstagram = async () => {

        await navigator.clipboard.writeText(
            window.location.href
        );

        toast.success(
            "Instagram sharing is not directly supported. Link copied to clipboard!"
        );
    };


    const handleNativeShare = async () => {

        if (navigator.share) {

            try {

                await navigator.share({

                    title:
                        product.title,

                    text:
                        product.desc ||
                        product.description,

                    url:
                        window.location.href,

                });

            } catch (err) {

                console.log(
                    "Share failed:",
                    err
                );
            }

        } else {

            setShowShare(!showShare);
        }
    };


    /*
     * =========================================================
     * CLOSE SHARE POPUP
     * =========================================================
     */

    useEffect(() => {

        const close = (e) => {

            if (
                shareRef.current &&
                !shareRef.current.contains(e.target)
            ) {

                setShowShare(false);
            }
        };


        document.addEventListener(
            "mousedown",
            close
        );


        return () =>
            document.removeEventListener(
                "mousedown",
                close
            );

    }, []);


    /*
     * =========================================================
     * LOADING STATE
     * =========================================================
     */

    if (loading) {

        return (

            <section className="py-10 md:py-20 bg-slate-50">

                <div className="container-custom">

                    <div className="grid lg:grid-cols-2 gap-12 animate-pulse">

                        <div className="h-[420px] md:h-[520px] rounded-[36px] bg-slate-200" />

                        <div>

                            <div className="h-12 w-3/4 bg-slate-200 rounded-xl mb-8" />

                            {[...Array(8)].map((_, i) => (

                                <div
                                    key={i}
                                    className="h-6 bg-slate-200 rounded-lg mb-4"
                                />

                            ))}

                        </div>

                    </div>

                </div>

            </section>
        );
    }


    /*
     * =========================================================
     * PRODUCT NOT FOUND
     * =========================================================
     */

    if (!product) {

        return (

            <section className="py-10 md:py-20 bg-slate-50 text-center">

                <div className="container-custom">

                    <h2 className="text-3xl font-bold text-slate-800">
                        Product Not Found
                    </h2>

                    <p className="text-slate-600 mt-4">
                        The requested product could not be located in our catalog.
                    </p>

                </div>

            </section>
        );
    }


    /*
     * =========================================================
     * MAIN PRODUCT PAGE
     * =========================================================
     */

    return (

        <section className="product-page">


            {/* PRODUCT SCHEMA */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            productSchema
                        ),
                }}
            />


            {/* FAQ SCHEMA */}

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            faqSchema
                        ),
                }}
            />


            <div className="container-custom">


                {/* =================================================
                    BREADCRUMB
                ================================================= */}

                <div className="product-breadcrumb">

                    <span>
                        Home
                    </span>

                    <span>
                        /
                    </span>

                    <span>
                        Products
                    </span>

                    <span>
                        /
                    </span>

                    <strong>
                        {product.title}
                    </strong>

                </div>


                {/* =================================================
                    PRODUCT MAIN
                ================================================= */}

                <div className="product-main">


                    {/* PRODUCT IMAGE GALLERY */}

                    <div className="product-gallery">

                        <div className="product-image-box">

                            {selectedMedia === "video" &&
                                product.video ? (

                                <video
                                    controls
                                    autoPlay
                                    className="product-video"
                                >

                                    <source
                                        src={product.video}
                                        type="video/mp4"
                                    />

                                </video>

                            ) : (

                                <>

                                    {!imageLoaded && (

                                        <div className="product-image-loader" />

                                    )}


                                    <img
                                        src={
                                            selectedImage ||
                                            product.image ||
                                            "/placeholder.jpg"
                                        }

                                        alt={
                                            product.title
                                        }

                                        onLoad={() =>
                                            setImageLoaded(true)
                                        }

                                        decoding="async"

                                        className={`product-main-image ${imageLoaded
                                            ? "image-loaded"
                                            : "image-loading"
                                            }`}

                                        onError={(e) => {

                                            e.currentTarget.src =
                                                "/placeholder.jpg";

                                        }}

                                    />

                                </>

                            )}

                        </div>


                        {/* THUMBNAILS */}

                        <div className="product-thumbnails">


                            {(product.images?.length
                                ? product.images
                                : [
                                    product.image ||
                                    "/placeholder.jpg",
                                ]
                            ).map((img, index) => (

                                <button
                                    key={index}

                                    onClick={() => {

                                        setSelectedImage(
                                            img
                                        );

                                        setSelectedMedia(
                                            "image"
                                        );

                                    }}

                                    className={`product-thumb ${selectedMedia === "image" &&
                                        selectedImage === img
                                        ? "active-thumb"
                                        : ""
                                        }`}
                                >

                                    <img
                                        src={img}
                                        alt=""
                                        decoding="async"
                                        loading="lazy"

                                        onError={(e) => {

                                            e.currentTarget.src =
                                                "/placeholder.jpg";

                                        }}

                                    />

                                </button>

                            ))}


                            {/* VIDEO */}

                            {product.video && (

                                <button

                                    onClick={() =>
                                        setSelectedMedia(
                                            "video"
                                        )
                                    }

                                    className={`media-thumb ${selectedMedia === "video"
                                        ? "active-thumb"
                                        : ""
                                        }`}
                                >

                                    <FaPlay />

                                    <span>
                                        Video
                                    </span>

                                </button>

                            )}


                            {/* PDF */}

                            {product.pdf && (

                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="media-thumb"
                                >

                                    <span className="pdf-icon">
                                        📄
                                    </span>

                                    <span>
                                        PDF
                                    </span>

                                </a>

                            )}

                        </div>

                    </div>


                    {/* =================================================
                        PRODUCT HEADER & INFO
                    ================================================= */}

                    <div className="product-details">


                        <div className="product-header">

                            <h1 className="product-title">
                                {product.title}
                            </h1>


                            {/* SHARE */}

                            <div
                                ref={shareRef}
                                className="share-wrapper"
                            >

                                <button
                                    onClick={
                                        handleNativeShare
                                    }

                                    className="share-btn"
                                >

                                    <FaShareAlt
                                        size={18}
                                    />

                                </button>


                                {showShare && (

                                    <div className="share-popup">


                                        <button
                                            onClick={
                                                handleCopy
                                            }

                                            className="share-item"
                                        >

                                            <FaLink />

                                            Copy Link

                                        </button>


                                        <button
                                            onClick={
                                                handleWhatsapp
                                            }

                                            className="share-item"
                                        >

                                            <FaWhatsapp
                                                className="whatsapp-icon"
                                            />

                                            WhatsApp

                                        </button>


                                        <button
                                            onClick={
                                                handleFacebook
                                            }

                                            className="share-item"
                                        >

                                            <FaFacebook
                                                className="facebook-icon"
                                            />

                                            Facebook

                                        </button>


                                        <button
                                            onClick={
                                                handleInstagram
                                            }

                                            className="share-item"
                                        >

                                            <FaInstagram
                                                className="instagram-icon"
                                            />

                                            Instagram

                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            QUICK SPECIFICATION CARD
                        ================================================= */}

                        <div className="product-info-card">


                            <ProductBrochureButton
                                product={product}
                            />


                            {product.brand && (

                                <p>

                                    <b>
                                        Brand:
                                    </b>

                                    {product.brand}

                                </p>

                            )}


                            {product.model && (

                                <p>

                                    <b>
                                        Model:
                                    </b>

                                    {product.model}

                                </p>

                            )}


                            {product.price && (

                                <p>

                                    <b>
                                        Price:
                                    </b>

                                    {product.price}

                                </p>

                            )}


                            {product.instrument && (

                                <p>

                                    <b>
                                        Instrument:
                                    </b>

                                    {product.instrument}

                                </p>

                            )}


                            {product.capacity && (

                                <p>

                                    <b>
                                        Capacity:
                                    </b>

                                    {product.capacity}

                                </p>

                            )}


                            {product.throughput && (

                                <p>

                                    <b>
                                        Throughput:
                                    </b>

                                    {product.throughput}

                                </p>

                            )}


                            {product.usage && (

                                <p>

                                    <b>
                                        Usage:
                                    </b>

                                    {product.usage}

                                </p>

                            )}


                            {product.automation && (

                                <p>

                                    <b>
                                        Automation:
                                    </b>

                                    {product.automation}

                                </p>

                            )}


                            {product.parameters && (

                                <p>

                                    <b>
                                        Parameters:
                                    </b>

                                    {product.parameters}

                                </p>

                            )}


                            {product.size && (

                                <p>

                                    <b>
                                        Size:
                                    </b>

                                    {product.size}

                                </p>

                            )}


                            {product.availability && (

                                <p>

                                    <b>
                                        Availability:
                                    </b>

                                    {product.availability}

                                </p>

                            )}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    DESCRIPTION + FORM + SPECIFICATIONS
                ================================================= */}

                <div className="product-bottom">

                    <div className="product-bottom-grid">


                        {/* =================================================
                            QUOTE FORM
                        ================================================= */}

                        <div className="quote-card">

                            <h2 className="quote-title">
                                Request A Quote
                            </h2>


                            <p className="quote-product">

                                Product :

                                <span>
                                    {product.title}
                                </span>

                            </p>


                            <form
                                onSubmit={handleSubmit}
                                className="quote-form"
                            >


                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={form.name}

                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name:
                                                e.target.value,
                                        })
                                    }

                                    className="form-input"
                                />


                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}

                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email:
                                                e.target.value,
                                        })
                                    }

                                    className="form-input"
                                />


                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    maxLength={10}
                                    value={form.phone}

                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone:
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                ),
                                        })
                                    }

                                    className="form-input"
                                />


                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="quote-btn"
                                >

                                    {submitting
                                        ? "Submitting..."
                                        : "Get Quote"}

                                </button>

                            </form>

                        </div>


                        {/* =================================================
                            PRODUCT DESCRIPTION
                        ================================================= */}

                        <div className="product-description-card">


                            <h3 className="description-title">
                                Product Description
                            </h3>


                            <p className="description-text">

                                {product.desc ||
                                    product.description ||
                                    "No description available."}

                            </p>




                            {/* =================================================
                                SEO CONTENT
                            ================================================= */}

                            <div className="seo-content">


                                <div className="seo-block">

                                    <h3>
                                        Why Choose Human Biomedical in {cityName}?
                                    </h3>

                                    <p>

                                        Human Biomedical is a trusted supplier and
                                        distributor of {product.title} in {cityName}.
                                        We provide high-quality biomedical and laboratory
                                        equipment for hospitals, pathology laboratories,
                                        diagnostic centres and healthcare facilities.

                                    </p>

                                </div>


                                <div className="seo-block">

                                    <h3>
                                        Features of {product.title}
                                    </h3>

                                    <p>

                                        {product.title} offers reliable performance,
                                        accurate results, easy operation, long service
                                        life and efficient workflow for laboratories
                                        and hospitals.

                                    </p>

                                </div>


                                <div className="seo-block">

                                    <h3>
                                        Applications of {product.title}
                                    </h3>

                                    <p>

                                        Widely used in hospitals, pathology labs,
                                        diagnostic centres, blood banks, research
                                        institutes and healthcare facilities.

                                    </p>

                                </div>


                                <div className="seo-block">

                                    <h3>
                                        {product.title} Supplier in {cityName}
                                    </h3>

                                    <p>

                                        Human Biomedical supplies {product.title} in {cityName}
                                        with technical support, installation assistance
                                        and customer service for hospitals and laboratories.

                                    </p>

                                </div>


                                <div className="seo-block">

                                    <h3>
                                        {product.title} Dealer in {cityName}
                                    </h3>

                                    <p>

                                        Human Biomedical is a trusted dealer of {product.title}
                                        in {cityName}. We supply biomedical equipment,
                                        laboratory instruments, diagnostic analyzers and
                                        healthcare devices to hospitals, pathology labs
                                        and research centres.

                                    </p>

                                </div>


                                <div className="seo-block">

                                    <h3>
                                        {product.title} Distributor in {cityName}
                                    </h3>

                                    <p>

                                        Looking for a reliable distributor of {product.title}
                                        in {cityName}? We provide installation support,
                                        product guidance, maintenance assistance
                                        and fast delivery.

                                    </p>

                                </div>


                                <div className="seo-block">

                                    <h3>
                                        Buy {product.title} in {cityName}
                                    </h3>

                                    <p>

                                        Buy high quality {product.title} in {cityName}
                                        at competitive prices. Contact Human Biomedical
                                        for the latest quotation and product availability.

                                    </p>

                                </div>


                                <div className="seo-block">

                                    <h3>
                                        {product.title} Price in {cityName}
                                    </h3>

                                    <p>

                                        The price of {product.title} depends on brand,
                                        model, specifications and features. Contact
                                        our team for the latest pricing, availability
                                        and delivery details.

                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                FAQ
                            ================================================= */}

                            <div className="product-faq">

                                <h3 className="faq-title">
                                    Frequently Asked Questions
                                </h3>


                                <div className="faq-list">


                                    <div className="faq-item">

                                        <h4>
                                            What is {product.title} used for in {cityName}?
                                        </h4>

                                        <p>

                                            {product.title} is commonly used in hospitals,
                                            pathology laboratories and diagnostic centres.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            What is the price of {product.title} in {cityName}?
                                        </h4>

                                        <p>

                                            Pricing depends on specifications,
                                            brand and model. Contact us for a quote.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            Are you an authorized supplier of {product.title}?
                                        </h4>

                                        <p>

                                            We supply genuine biomedical and
                                            laboratory equipment from trusted brands.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            Can hospitals in {cityName} order this product?
                                        </h4>

                                        <p>

                                            Yes, hospitals, pathology laboratories,
                                            diagnostic centres and healthcare facilities
                                            can order this product.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            Do you provide installation support?
                                        </h4>

                                        <p>

                                            Yes, installation and technical support
                                            are available depending on the product.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            Can I request a quotation?
                                        </h4>

                                        <p>

                                            Yes, you can submit the enquiry form on
                                            this page to receive pricing and product
                                            information.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            Do you provide warranty?
                                        </h4>

                                        <p>

                                            Warranty depends on the manufacturer and
                                            product model.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            Do you deliver across India?
                                        </h4>

                                        <p>

                                            Yes, we supply products across India with
                                            safe packaging and logistics support.

                                        </p>

                                    </div>


                                    <div className="faq-item">

                                        <h4>
                                            How can I contact Human Biomedical?
                                        </h4>

                                        <p>

                                            You can fill out the enquiry form or
                                            contact our team directly for product
                                            details and quotations.

                                        </p>

                                    </div>


                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <Footer city={city} />

        </section>
    );
}