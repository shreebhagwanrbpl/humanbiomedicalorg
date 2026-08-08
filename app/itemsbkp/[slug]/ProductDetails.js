"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDocs, addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
export default function ProductDetails({
    slug,
    city = "",
}) {
    const [product, setProduct] =
        useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [activeMedia, setActiveMedia] = useState("image");
    const cityName = city
        ? city
            .split("-")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ")
        : "India";
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                let foundProduct = null;

                // OLD PRODUCTS
                const oldSnap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "humanbiomedicalorg",
                        "pages",
                        "products"
                    )
                );

                if (oldSnap.exists()) {
                    const products =
                        oldSnap.data().products || [];

                    foundProduct = products.find((item) => {
                        const generatedSlug =
                            item.title
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^\w-]+/g, "");

                        return generatedSlug === slug;
                    });
                }

                // CATEGORY PRODUCTS
                if (!foundProduct) {
                    const categorySnap = await getDocs(
                        collection(
                            db,
                            "websites",
                            "humanbiomedicalorg",
                            "pages",
                            "categoryproducts",
                            "categories"
                        )
                    );

                    categorySnap.forEach((categoryDoc) => {
                        const categoryProducts =
                            categoryDoc.data().products || [];

                        const match =
                            categoryProducts.find((item) => {
                                const generatedSlug =
                                    item.title
                                        ?.toLowerCase()
                                        .replace(/\s+/g, "-")
                                        .replace(/[^\w-]+/g, "");

                                return (
                                    generatedSlug === slug
                                );
                            });

                        if (match) {
                            foundProduct = {
                                ...match,
                                category:
                                    categoryDoc.data()
                                        .category ||
                                    categoryDoc.id,
                            };
                        }
                    });
                }

                console.log(
                    "FOUND PRODUCT =",
                    foundProduct
                );

                setProduct(foundProduct);
            } catch (error) {
                console.error(
                    "Error fetching product:",
                    error
                );
            }
        };

        fetchProduct();
    }, [slug]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone } = formData;

        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            toast.error("Invalid email");
            return;
        }

        if (!phone.trim()) {
            toast.error("Phone number is required");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            toast.error("Enter valid 10 digit phone");
            return;
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
                    name,
                    email,
                    phone,
                    productName: product.title,
                    productSlug: product.slug,
                    createdAt: serverTimestamp(),
                }
            );

            toast.success(
                "Enquiry submitted successfully"
            );

            setFormData({
                name: "",
                email: "",
                phone: "",
            });

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };
    const [zoomPos, setZoomPos] = useState({
        x: 50,
        y: 50,
    });
    if (!product) {
        return (
            <>
                <Navbar city={city} />

                <section className="max-w-7xl mx-auto px-6 py-20 animate-pulse">

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                        <div className="bg-gray-200 rounded-3xl h-[300px] sm:h-[450px] lg:h-[500px]"></div>

                        <div>

                            <div className="h-14 bg-gray-200 rounded-xl w-3/4"></div>

                            <div className="mt-6 h-6 bg-gray-200 rounded"></div>
                            <div className="mt-3 h-6 bg-gray-200 rounded w-5/6"></div>

                            <div className="grid grid-cols-2 gap-4 mt-10">

                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="border rounded-2xl p-4 sm:p-5"
                                    >
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                        <div className="h-6 bg-gray-200 rounded w-28 mt-3"></div>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </section>

                <Footer city={city} />
            </>
        );
    }

    return (
        <>
            <Toaster position="top-right" />
            <Navbar city={city} />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* LEFT MEDIA */}
                    <div className="space-y-4">

                        {/* MAIN PREVIEW */}
                        <div
                            className="
            overflow-hidden
            rounded-3xl
            bg-white
            border
            h-[300px]
            sm:h-[450px]
            lg:h-[600px]
            flex
            items-center
            justify-center
            p-4
            sm:p-6
            lg:p-8
            "
                            onMouseMove={(e) => {
                                const rect =
                                    e.currentTarget.getBoundingClientRect();

                                const x =
                                    ((e.clientX - rect.left) /
                                        rect.width) *
                                    100;

                                const y =
                                    ((e.clientY - rect.top) /
                                        rect.height) *
                                    100;

                                setZoomPos({ x, y });
                            }}
                        >
                            {activeMedia === "video" && product.video ? (
                                <video
                                    controls
                                    autoPlay
                                    className="
                    w-full
                    h-full
                    object-contain
                    rounded-2xl
                    "
                                >
                                    <source
                                        src={product.video}
                                        type="video/mp4"
                                    />
                                </video>
                            ) : (
                                <img
                                    src={
                                        product.images?.[activeImage] ||
                                        product.image ||
                                        "/placeholder.png"
                                    }
                                    alt={product.title}
                                    className="
                    max-w-full
                    max-h-full
                    object-contain
                    transition-transform
                    duration-200
                    cursor-zoom-in
                    hover:scale-[2]
                    "
                                    style={{
                                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                    }}
                                />
                            )}
                        </div>

                        {/* THUMBNAILS */}
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">

                            {/* Images */}
                            {product.images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    onClick={() => {
                                        setActiveImage(index);
                                        setActiveMedia("image");
                                    }}
                                    className={`
                    w-full
                    h-20
                    object-cover
                    rounded-xl
                    border-2
                    cursor-pointer
                    transition
                    ${activeMedia === "image" &&
                                            activeImage === index
                                            ? "border-blue-600"
                                            : "border-gray-200"
                                        }
                    `}
                                />
                            ))}

                            {/* Video Card */}
                            {product.video && (
                                <div
                                    onClick={() =>
                                        setActiveMedia("video")
                                    }
                                    className={`
                    h-20
                    border-2
                    rounded-xl
                    bg-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    cursor-pointer
                    transition
                    ${activeMedia === "video"
                                            ? "border-blue-600"
                                            : "border-gray-200"
                                        }
                    `}
                                >
                                    <span className="text-2xl">
                                        🎥
                                    </span>

                                    <span className="text-xs font-semibold mt-1">
                                        Video
                                    </span>
                                </div>
                            )}

                            {/* PDF Card */}
                            {product.pdf && (
                                <a
                                    href={product.pdf}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                    h-20
                    border-2
                    border-gray-200
                    rounded-xl
                    bg-white
                    flex
                    flex-col
                    items-center
                    justify-center
                    cursor-pointer
                    hover:border-red-500
                    transition
                    "
                                >
                                    <span className="text-2xl">
                                        📄
                                    </span>

                                    <span className="text-xs font-semibold mt-1">
                                        PDF
                                    </span>
                                </a>
                            )}

                        </div>

                    </div>

                    {/* RIGHT CONTENT */}
                    <div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                            {product.title}
                        </h1>

                        <p className="mt-5 text-gray-600 text-lg">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                            <div className="border rounded-2xl p-4 sm:p-5">
                                <p className="text-gray-500">Brand</p>
                                <h3 className="font-bold mt-2">
                                    {product.brand}
                                </h3>
                            </div>

                            <div className="border rounded-2xl p-4 sm:p-5">
                                <p className="text-gray-500">Model</p>
                                <h3 className="font-bold mt-2">
                                    {product.model}
                                </h3>
                            </div>

                            <div className="border rounded-2xl p-4 sm:p-5">
                                <p className="text-gray-500">Throughput</p>
                                <h3 className="font-bold mt-2">
                                    {product.throughput}
                                </h3>
                            </div>

                            <div className="border rounded-2xl p-4 sm:p-5">
                                <p className="text-gray-500">Usage</p>
                                <h3 className="font-bold mt-2">
                                    {product.usage}
                                </h3>
                            </div>

                            <div className="border rounded-2xl p-4 sm:p-5">
                                <p className="text-gray-500">Automation</p>
                                <h3 className="font-bold mt-2">
                                    {product.automation}
                                </h3>
                            </div>

                            <div className="border rounded-2xl p-4 sm:p-5">
                                <p className="text-gray-500">Availability</p>
                                <h3 className="font-bold mt-2">
                                    {product.availability}
                                </h3>
                            </div>

                            <div className="border rounded-2xl p-4 sm:p-5">
                                <p className="text-gray-500">Instrument</p>
                                <h3 className="font-bold mt-2">
                                    {product.instrument}
                                </h3>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ENQUIRY FORM */}
                <div className="mt-20">

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 sm:mb-8">
                        Send Enquiry
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white border rounded-3xl p-5 sm:p-8"
                    >

                        <div className="grid md:grid-cols-2 gap-5">

                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="border rounded-xl p-4 w-full"
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="border rounded-xl p-4 w-full"
                            />

                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                className="border rounded-xl p-4 md:col-span-2"
                            />

                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="
mt-5
w-full
sm:w-auto
px-8
py-4
bg-blue-600
text-white
rounded-xl
font-semibold
hover:bg-blue-700
transition
"
                        >
                            {submitting
                                ? "Submitting..."
                                : "Submit Enquiry"}
                        </button>

                    </form>

                </div>
                <div className="mt-16 bg-white border rounded-3xl p-8">

                    <h2 className="text-3xl font-black mb-6">
                        {product.title} in {cityName}
                    </h2>

                    <div className="space-y-5 text-gray-700 leading-8">

                        <p>
                            We are a trusted {product.title} supplier in{" "}
                            {cityName}, providing advanced biomedical
                            equipment for hospitals, pathology laboratories,
                            diagnostic centres, and healthcare facilities.
                        </p>

                        <p>
                            Looking for a reliable {product.title} dealer in{" "}
                            {cityName}? We offer installation support,
                            maintenance services, training, and quick
                            delivery across {cityName} and nearby areas.
                        </p>

                        <p>
                            As a leading {product.title} distributor in{" "}
                            {cityName}, we focus on quality, performance,
                            and complete after-sales support for our
                            customers.
                        </p>

                        <p>
                            Contact us today for the latest {product.title}
                            price in {cityName}, product specifications,
                            quotation, and availability.
                        </p>

                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4">
                            Popular Searches
                        </h3>

                        <div className="grid md:grid-cols-2 gap-3 text-blue-600 font-medium">

                            <div>{product.title} in {cityName}</div>
                            <div>{product.title} Supplier in {cityName}</div>
                            <div>{product.title} Dealer in {cityName}</div>
                            <div>{product.title} Distributor in {cityName}</div>
                            <div>{product.title} Manufacturer in {cityName}</div>
                            <div>{product.title} Price in {cityName}</div>
                            <div>Buy {product.title} in {cityName}</div>
                            <div>{product.title} Service Provider in {cityName}</div>

                        </div>
                    </div>

                </div>
            </section>

            <Footer city={city} />
        </>
    );
}