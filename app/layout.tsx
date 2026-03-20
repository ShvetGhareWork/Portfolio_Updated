import type { Metadata } from "next";
import { Fira_Code, Antic } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fira-code",
  display: "swap",
});

const antic = Antic({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-antic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shvet Ghare",
  description: "Designing human experiences in code.",
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
      <body className={`${firaCode.variable} ${antic.variable}`}>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
