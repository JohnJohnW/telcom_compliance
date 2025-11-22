import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
        bodySizeLimit: '2mb',
    },
  },
  devIndicators: false,
};

export default nextConfig;
