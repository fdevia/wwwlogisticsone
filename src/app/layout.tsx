import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ProductContextProvider } from "./ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "logisticsone",
  description: "wwww logisticsone",
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
