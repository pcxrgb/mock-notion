import "./globals.css";
import React from "react";
import ConnectGate from "../components/ConnectGate";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="is-spatial">
      <body>
        <ConnectGate>{children}</ConnectGate>
      </body>
    </html>
  );
}
