import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Ranade by Indian Type Foundry, via Fontshare (ITF Free Font License)
const ranade = localFont({
  src: "./fonts/Ranade-Variable.woff2",
  variable: "--font-ranade",
  weight: "100 700",
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
    <html lang="en" className={`${ranade.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
