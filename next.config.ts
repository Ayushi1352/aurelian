import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/webp"],
    qualities: [75, 80, 90],
    // Largest served width is 2560px (no 3840px files) - full-width photos stay sharp on retina laptops.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
    // Optimised images stay cached for 31 days.
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
