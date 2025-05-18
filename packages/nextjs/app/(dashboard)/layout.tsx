import type { Metadata } from "next";
import {
  ToKasaProviders,
  ToKasaApp,
} from "~~/components/tokasa/ToKasaAppWithProviders";
import "~~/styles/globals.css";
import "./dashboard/dashboard.css";
import { ThemeProvider } from "~~/components/ThemeProvider";

export const metadata: Metadata = {
  title: "ToKasa Dashboard",
  description: "Real Estate Tokenization Platform",
  icons: "/logo.ico",
};

// Layout independiente para dashboard
export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider enableSystem>
          <ToKasaProviders>
            <ToKasaApp>{children}</ToKasaApp>
          </ToKasaProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
