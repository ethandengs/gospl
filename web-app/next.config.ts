import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/lib': path.join(__dirname, 'src/lib'),
      '@/lib/supabase': path.join(__dirname, 'src/lib/supabase'),
      '@/lib/design-tokens': path.join(__dirname, 'src/lib/design-tokens'),
      '@/lib/utils': path.join(__dirname, 'src/lib/utils')
    };
    return config;
  }
};

export default nextConfig;
