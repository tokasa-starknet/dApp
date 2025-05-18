import type { Metadata } from "next";
import "~~/styles/globals.css";

export const metadata: Metadata = {
  title: "ToKasa",
  description: "Real Estate Tokenization Platform",
  icons: "/logo.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
