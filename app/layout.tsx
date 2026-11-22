import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { SvgFilters } from "@/components/landing/svg-filters";
import "./globals.css";

// Switzer by Indian Type Foundry, via Fontshare (ITF Free Font License)
const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

// Poppins is used for the wordmark only
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "pinpoint: everything you need, in one place",
  description:
    "pinpoint is a pin you wear and an app you check. It keeps track of where you need to be, what you said you’d do, and everything in between.",
};

export const viewport: Viewport = {
  themeColor: "#05060d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${switzer.variable} ${poppins.variable} antialiased`}>
      <body className="min-h-full">
        <SvgFilters />
        {children}
      </body>
    </html>
  );
}
