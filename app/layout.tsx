import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ErrorHandlingProvider } from "@/providers/error-handler-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Dashboard",
  description: "Personal Performance Dashboard - André Moura Henriques",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-gray-950 text-gray-50 selection:bg-primary/30`}>
        <ErrorHandlingProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ErrorHandlingProvider>
      </body>
    </html>
  );
}