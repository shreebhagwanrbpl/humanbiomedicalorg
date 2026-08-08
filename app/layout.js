import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  metadataBase: new URL(
    "https://humanbiomedical.org"
  ),

  title:
    "Biomedical Equipment Supplier in India | Human Biomedical",

  description:
    "Human Biomedical supplies CBC Machines, Hematology Analyzers, Biochemistry Analyzers, ELISA Readers, Diagnostic Equipment and Laboratory Instruments across India.",

  keywords: [
    "Biomedical Equipment Supplier",
    "Laboratory Equipment Supplier",
    "CBC Machine Supplier",
    "Hematology Analyzer Supplier",
    "Biochemistry Analyzer Supplier",
    "ELISA Reader Supplier",
    "Diagnostic Equipment Supplier",
    "Medical Equipment Supplier India",
    "Laboratory Instruments",
    "Human Biomedical",
  ],

  openGraph: {
    title: {
      default:
        "Biomedical Equipment Supplier in India | Human Biomedical",
      template:
        "%s | Human Biomedical",
    },

    description:
      "Supplier of biomedical and laboratory equipment across India.",

    url: "https://humanbiomedical.org",

    siteName: "Human Biomedical",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Human Biomedical",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Biomedical Equipment Supplier in India | Human Biomedical",

    description:
      "Supplier of biomedical and laboratory equipment across India.",

    images: ["/logo.png"],
  },

  alternates: {
    canonical:
      "https://humanbiomedical.org",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}

      </body>
    </html>
  );
}