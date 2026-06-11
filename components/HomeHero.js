"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HomeHero({ city }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const snap = await getDoc(
                doc(
                    db,
                    "websites",
                    "humanbiomedicalorg",
                    "pages",
                    "home"
                )
            );

            if (snap.exists()) {
                setData(snap.data());
            }
        };

        fetchData();
    }, []);
    const makeLink = (path = "") => {
        if (!city) {
            return path || "/";
        }

        const slug = city
            .toLowerCase()
            .replace(/\s+/g, "-");

        return `/${slug}${path}`;
    };
    if (!data) {
        return (
            <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 animate-pulse">

                    <div>
                        <div className="h-16 bg-gray-200 rounded-xl w-3/4"></div>
                        <div className="mt-4 h-6 bg-gray-200 rounded w-full"></div>
                        <div className="mt-2 h-6 bg-gray-200 rounded w-5/6"></div>

                        <div className="flex gap-4 mt-8">
                            <div className="h-14 w-40 bg-gray-200 rounded-2xl"></div>
                            <div className="h-14 w-40 bg-gray-200 rounded-2xl"></div>
                        </div>
                    </div>

                    <div className="h-[500px] bg-gray-200 rounded-[40px]"></div>

                </div>
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6">
            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                <div>
                    <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-gray-900">
                        {data.title}
                        {city && ` in ${city}`}
                    </h1>

                    <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 max-w-2xl">
                        {data.description}
                        {city && ` serving hospitals and laboratories in ${city}`}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <a
                            href={makeLink("/items")}
                            className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        >
                            {data.button1Text}
                        </a>

                        <a
                            href={makeLink("/contact")}
                            className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl border border-blue-200"
                        >
                            {data.button2Text}
                        </a>
                    </div>
                </div>

                <div className="relative flex justify-center">

                    <div className="relative">

                        <div className="bg-white/70 backdrop-blur-2xl rounded-[24px] md:rounded-[40px] border border-white shadow-2xl p-3 sm:p-4 md:p-6">

                            <img
                                src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=1200&auto=format&fit=crop"
                                alt="Biomedical Equipment"
                                className="w-full max-w-[520px] h-[280px] sm:h-[420px] lg:h-[600px] object-cover rounded-[20px] md:rounded-[30px]"
                            />

                        </div>

                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-bottom-8 lg:-left-8 bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border border-blue-100 w-[180px] sm:w-[220px] md:w-64">

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg">
                                🧪
                            </div>

                            <h3 className="mt-4 text-base sm:text-lg md:text-xl font-bold text-gray-900">
                                Smart Laboratory Solutions
                            </h3>

                            <p className="mt-2 text-gray-600 leading-6 text-xs md:text-sm">
                                Advanced pathology and healthcare automation systems.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}