import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "pinpoint: everything you need, in one place",
  description:
    "Your work lives across dozens of apps. pinpoint brings it together, helps you find what matters, and keeps your information where it belongs.",
};

export const viewport: Viewport = {
  themeColor: "#f5f6ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
