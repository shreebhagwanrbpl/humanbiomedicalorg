import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } =
            new URL(request.url);

        const imageUrl =
            searchParams.get("url");

        if (!imageUrl) {
            return new NextResponse(
                "Missing image URL",
                { status: 400 }
            );
        }

        if (
            !imageUrl.startsWith("http://") &&
            !imageUrl.startsWith("https://")
        ) {
            return new NextResponse(
                "Invalid image URL",
                { status: 400 }
            );
        }

        const response =
            await fetch(imageUrl, {
                cache: "no-store",
            });

        if (!response.ok) {
            return new NextResponse(
                "Unable to fetch image",
                {
                    status: response.status,
                }
            );
        }

        const contentType =
            response.headers.get(
                "content-type"
            ) || "image/jpeg";

        const arrayBuffer =
            await response.arrayBuffer();

        return new NextResponse(
            arrayBuffer,
            {
                status: 200,
                headers: {
                    "Content-Type":
                        contentType,
                    "Cache-Control":
                        "public, max-age=3600",
                },
            }
        );
    } catch (error) {
        console.error(
            "Image proxy error:",
            error
        );

        return new NextResponse(
            "Image proxy error",
            { status: 500 }
        );
    }
}