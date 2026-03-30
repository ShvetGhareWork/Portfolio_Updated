import type { NextConfig } from "next";

// next-pwa injects a webpack config; adding turbopack: {} tells Next.js 16
// that we're aware of the mismatch and still want Turbopack for dev.
const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
};

// next-pwa uses CJS; dynamic require keeps ESM compatibility
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);

