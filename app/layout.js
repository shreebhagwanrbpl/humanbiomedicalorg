import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    "https://humanbiomedical.com"
  ),

  title: {
    default: "Human Biomedical",
    template: "%s | Human Biomedical",
  },

  description:
    "Advanced Biomedical Equipment & Healthcare Solutions",

  keywords: [
    "Biomedical Equipment",
    "Medical Analyzer",
    "Diagnostic Equipment",
    "Laboratory Equipment",
    "Healthcare Solutions",
  ],

  alternates: {
    canonical:
      "https://humanbiomedical.com",
  },

  openGraph: {
    title: "Human Biomedical",
    description:
      "Advanced Biomedical Equipment & Healthcare Solutions",
    url: "https://humanbiomedical.com",
    siteName: "Human Biomedical",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}