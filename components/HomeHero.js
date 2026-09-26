"use client";

import { useEffect, useState } from "react";

export default function HomeHero({ city }) {
    const [data, setData] = useState({
        title: "",
        description: "",
        button1Text: "",
        button2Text: "",
        image: "/hero-biomedical.jpg",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/site-data?type=home");
                if (res.ok) {
                    const json = await res.json();
                    const pageData = json?.data || json;
                    if (pageData) {
                        setData((prev) => ({
                            ...prev,
                            ...pageData,
                            image:
                                pageData.image ||
                                pageData.imageUrl ||
                                pageData.heroImage ||
                                pageData.img ||
                                (Array.isArray(pageData.images) && pageData.images[0]) ||
                                (Array.isArray(pageData.media) && pageData.media[0]?.url) ||
                                prev.image,
                        }));
                    }
                }
            } catch (err) {
                console.error("[HomeHero] Error fetching home page data:", err);
            }
        };

        fetchData();
    }, []);

    const makeLink = (path = "") => {
        const cleanPath = path || "/";
        if (!city) {
            return cleanPath;
        }

        const slug = city
            .toLowerCase()
            .replace(/\s+/g, "-");

        return `/${slug}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
    };

    const heroImage =
        data?.image ||
        data?.imageUrl ||
        data?.heroImage ||
        data?.img ||
        "/hero-biomedical.jpg";

    const titleText = data?.title
        ? `${data.title}${city ? ` in ${city}` : ""}`
        : "";

    const descText = data?.description
        ? `${data.description}${city ? ` serving hospitals and laboratories in ${city}` : ""}`
        : "";

    return (
        <section className="relative overflow-hidden pt-2 sm:pt-4 pb-8 sm:pb-10 px-4 sm:px-6">
            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                    {titleText ? (
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black leading-[1.15] text-gray-950 line-clamp-2 tracking-tight"
                            title={titleText}
                        >
                            {titleText}
                        </h1>
                    ) : null}

                    {descText ? (
                        <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-2xl line-clamp-3">
                            {descText}
                        </p>
                    ) : null}

                    {(data?.button1Text || data?.button2Text) ? (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                            {data?.button1Text ? (
                                <a
                                    href={makeLink(data?.button1Link || "/items")}
                                    className="w-full sm:w-auto text-center px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 text-white font-bold shadow-[0_10px_25px_rgba(14,165,233,0.3)] hover:shadow-[0_15px_30px_rgba(14,165,233,0.4)] hover:-translate-y-0.5 transition duration-300"
                                >
                                    {data?.button1Text}
                                </a>
                            ) : null}

                            {data?.button2Text ? (
                                <a
                                    href={makeLink(data?.button2Link || "/contact")}
                                    className="w-full sm:w-auto text-center px-7 py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-800 font-bold shadow-sm hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-700 hover:-translate-y-0.5 transition duration-300"
                                >
                                    {data?.button2Text}
                                </a>
                            ) : null}
                        </div>
                    ) : null}
                </div>

                {/* HERO IMAGE */}
                <div className="relative flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[500px]">
                        {/* Glow accent */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-cyan-400/15 to-blue-600/10 rounded-[36px] blur-xl" />

                        {/* Image Frame */}
                        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-gray-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-2.5 sm:p-3.5">
                            <div className="overflow-hidden rounded-[22px] sm:rounded-[28px] bg-slate-50">
                                <img
                                    src={heroImage}
                                    alt="Biomedical Equipment"
                                    className="w-full h-[260px] sm:h-[320px] lg:h-[370px] object-cover transition duration-700 hover:scale-105"
                                    loading="eager"
                                    onError={(e) => {
                                        e.currentTarget.src = "/hero-biomedical.jpg";
                                    }}
                                />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-4 left-6 sm:-bottom-5 sm:left-6 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-blue-100/80 flex items-center gap-3 sm:gap-4 max-w-[240px] sm:max-w-[270px]">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white text-lg sm:text-xl shadow-md shrink-0">
                                🧪
                            </div>

                            <div className="min-w-0">
                                <h3 className="text-xs sm:text-sm font-bold text-gray-950 leading-tight truncate">
                                    Smart Lab Solutions
                                </h3>

                                <p className="mt-0.5 text-[11px] sm:text-xs text-gray-500 leading-tight truncate">
                                    Pathology & Automation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}