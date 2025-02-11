import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tukuo Store",
  description: "Tukuo Store Ecommerce",
  icons: {
    icon: "/faviconn.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>{children}</body>
      </html>
    </QueryProvider>
  );
}
