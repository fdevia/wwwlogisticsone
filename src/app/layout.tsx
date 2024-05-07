import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ProductContextProvider } from "./ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Under Construction www.logisticsone.pe",
  description: "logisticsone Under Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ProductContextProvider>
  );
}
