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
  // Configure for production builds
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'gospl.health']
    },
    optimizePackageImports: ['@heroicons/react'],
    // Add proper static generation settings
    staticGenerationRetryCount: 3,
    staticGenerationMaxConcurrency: 8,
    staticGenerationMinPagesPerWorker: 25,
  },
  // Enable static optimization
  output: 'export',
  // Ensure 404 page is generated
  trailingSlash: false,
  // Custom error page handling
  async redirects() {
    return [];
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
