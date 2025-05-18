import type { Metadata } from "next";
import "~~/styles/globals.css";
import { ThemeProvider } from "~~/components/ThemeProvider";
import { ScaffoldStarkAppWithProviders } from "~~/components/ScaffoldStarkAppWithProviders";

export const metadata: Metadata = {
  title: "Debug - ToKasa",
  description: "Debug Starknet components",
};

export default function DebugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider enableSystem>
          <ScaffoldStarkAppWithProviders>
            {children}
          </ScaffoldStarkAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
