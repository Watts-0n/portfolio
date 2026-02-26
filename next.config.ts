import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true, // Enable partial pre-rendering
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;