import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactCompiler: true,
    experimental:
    {
      turbopackFileSystemCacheForDev: true,
    },
    output: 'export',
    basePath: '/portfolio',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;