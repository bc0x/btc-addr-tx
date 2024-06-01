import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// const dm_mono = DM_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Address Check",
  description: "BTC Address Check",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
