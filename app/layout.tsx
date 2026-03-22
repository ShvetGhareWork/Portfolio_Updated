import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { Carattere, Fira_Code, Outfit, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fira-code",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const fontLogo = Carattere({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shvet Ghare",
  description: "Designing human experiences in code.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Shvet Ghare",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Shvet Ghare",
    description: "Designing human experiences in code.",
  },
};


import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} ${outfit.variable} ${inter.variable} ${plusJakartaSans.variable} ${fontLogo.variable}`}>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
