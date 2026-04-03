import "./globals.css";
import React from "react";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Notion",
    template: "%s — Notion",
  },
  description: "Notion",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon-180x180.png",
  },
  themeColor: "#ffffff",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="is-spatial">
      <body>{children}</body>
    </html>
  );
}
