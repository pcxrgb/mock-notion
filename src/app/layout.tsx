import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="is-spatial">
      <body>{children}</body>
    </html>
  );
}
