import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
        bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
