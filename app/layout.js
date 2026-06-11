import "./globals.css";

export const metadata = {
  title: "Human Biomedical",
  description: "Premium biomedical website"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
