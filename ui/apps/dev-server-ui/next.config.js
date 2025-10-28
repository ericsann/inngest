// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@inngest/components'],
  experimental: {
    // @ts-ignore
    turbopack: {
      root: '/app',
    },
  },
};

module.exports = nextConfig;
