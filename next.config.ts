import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable Turbopack for middleware if needed
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

