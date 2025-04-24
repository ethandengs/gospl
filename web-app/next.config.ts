import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true, // We'll handle linting separately
  },
  // Configure for production builds
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'gospl.health']
    },
    optimizePackageImports: ['@heroicons/react'],
  },
  // Static generation settings
  output: 'export',
  // Ensure proper routing
  trailingSlash: false,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
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
