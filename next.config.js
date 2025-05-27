/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.clerk.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
