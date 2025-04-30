// src/app/layout.tsx
export const dynamic = 'auto'
export const revalidate = false;

import type { Metadata, Viewport } from "next";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { VercelAnalyticsClient } from "@/components/common/VercelAnalyticsClient";
import { fontClass } from "@/lib/fonts";
import { AuthProvider } from "@/contexts/AuthContext";
import { buildLogger } from "@/lib/utils/build-logger";
import "./globals.css";

// Log module initialization
buildLogger.info("[RootLayout] module initialized");

export const metadata: Metadata = {
  title: {
    default: "GOSPL Health Monitor",
    template: "%s | GOSPL Health Monitor",
  },
  description: "Smart slipper system for elderly gait monitoring and fall detection",
  keywords: [
    "health monitoring",
    "elderly care",
    "gait analysis",
    "fall detection",
    "smart slippers",
    "healthcare technology",
  ],
  authors: [{ name: "GOSPL Team", url: "https://gospl.health" }],
  creator: "GOSPL Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gospl.health",
    title: "GOSPL Health Monitor",
    description: "Smart slipper system for elderly gait monitoring and fall detection",
    siteName: "GOSPL Health Monitor",
    images: [
      {
        url: "/gospl_black.svg",
        width: 244,
        height: 65,
        alt: "GOSPL Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GOSPL Health Monitor",
    description: "Smart slipper system for elderly gait monitoring and fall detection",
    creator: "@gospl_health",
    images: ["/gospl_black.svg"],
  },
  icons: {
    icon: [{ url: "/app-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

buildLogger.debug("[RootLayout] metadata loaded", metadata as Record<string, unknown>);

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "rgb(23, 23, 23)" },
  ],
  width: "device-width",
  initialScale: 1,
};

buildLogger.debug("[RootLayout] viewport loaded", viewport as Record<string, unknown>);

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  buildLogger.info("[RootLayout] render start");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yja8etl.css" />
      </head>
      <body className={fontClass}>
        <ThemeProvider defaultTheme="system" storageKey="gospl-ui-theme">
          <AuthProvider>
            {children}
            {/* <Toaster /> */}
          </AuthProvider>
        </ThemeProvider>
        <VercelAnalyticsClient />
      </body>
    </html>
  );
}
