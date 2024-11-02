/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React strict mode
    swcMinify: true,       // Enables SWC-based minification for faster builds and smaller bundle sizes
    images: {
      domains: ['example.com'], // Allow images from specific domains
    },
    experimental: {
      appDir: true, // Enables the new Next.js app directory (for Next.js 13+)
    },
  };
  
  module.exports = nextConfig;
  