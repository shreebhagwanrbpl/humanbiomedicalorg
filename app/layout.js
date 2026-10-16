import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://humanbiomedical.org"),

  title: {
    default: "Biomedical Equipment Supplier in India | Human Biomedical",
    template: "%s | Human Biomedical",
  },

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

  authors: [{ name: "Human Biomedical", url: "https://humanbiomedical.org" }],
  creator: "Human Biomedical",
  publisher: "Human Biomedical",

  openGraph: {
    title: "Biomedical Equipment Supplier in India | Human Biomedical",
    description: "Supplier of advanced biomedical, clinical analyzers, and laboratory equipment across India.",
    url: "https://humanbiomedical.org",
    siteName: "Human Biomedical",
    images: [
      {
        url: "/humanlogo.png",
        width: 1200,
        height: 630,
        alt: "Human Biomedical - Advanced Medical Equipment",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Biomedical Equipment Supplier in India | Human Biomedical",
    description: "Supplier of advanced biomedical and laboratory equipment across India.",
    images: ["/humanlogo.png"],
  },

  alternates: {
    canonical: "https://humanbiomedical.org",
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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/humanlogo.png",
    apple: "/humanlogo.png",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Human Biomedical",
  alternateName: "Human Biomedicals LLP",
  url: "https://humanbiomedical.org",
  logo: "https://humanbiomedical.org/humanlogo.png",
  description:
    "Leading supplier and distributor of clinical laboratory equipment, hematology analyzers, biochemistry analyzers, and medical diagnostic instruments in India.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "India",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support & Sales",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}