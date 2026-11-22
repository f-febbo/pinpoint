import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Switzer by Indian Type Foundry, via Fontshare (ITF Free Font License).
// A free stand-in for Neue Haas Grotesk Display, which is listed first in the
// font stack so it takes over if an Adobe Fonts kit for it is ever added.
const switzer = localFont({
  src: "./fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "pinpoint: everything you need, in one place",
  description:
    "pinpoint connects your calendars, inbox and chats so you always know where to be, what you promised, and where everything is.",
};

export const viewport: Viewport = {
  themeColor: "#f1f2ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${switzer.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
